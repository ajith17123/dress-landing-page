import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";

/**
 * SmoothScroll component
 * Sets up Lenis smooth scrolling harmonized with GSAP ScrollTrigger and AOS.
 * Provides 60/120fps smooth scrolling while preserving all existing layouts and animations.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
      infinite: false,
    });

    // Provide global access for custom scroll triggers or anchor helpers
    window.lenis = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger & AOS
    const handleScroll = () => {
      ScrollTrigger.update();
      if (typeof AOS !== "undefined" && AOS.refresh) {
        AOS.refresh();
      }
    };
    lenis.on("scroll", handleScroll);

    // Synchronize GSAP ticker with Lenis requestAnimationFrame
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    // Disable lag smoothing for exact frame-by-frame synchronization
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", handleScroll);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return children;
}
