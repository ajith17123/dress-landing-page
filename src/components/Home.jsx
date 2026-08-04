import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Search, User, Heart, ShoppingBag, Menu, X,
  ArrowRight, ArrowUpRight, ChevronRight,
  Feather, Shirt, Recycle, Truck, Check,
} from "lucide-react";
import "../assets/style/Home.css";

/* ─── Local images ──────────────────────────────────────────────── */
import imgHero           from "../assets/images/hero-women-white.jpg";
import imgCouple         from "../assets/images/couple-fashion.jpg";
import imgCatMen         from "../assets/images/cat-men.jpg";
import imgCatWomen       from "../assets/images/cat-women.jpg";
import imgCatKids        from "../assets/images/cat-kids.jpg";
import imgProd1          from "../assets/images/prod-1.png";
import imgProd2          from "../assets/images/prod-2.jpg";
import imgProd3          from "../assets/images/prod-3.jpg";
import imgProd4          from "../assets/images/prod-4.jpg";
import imgProductTshirt  from "../assets/images/product-tshirt.png";
import imgSummer         from "../assets/images/summer-model.jpg";
import imgEssentials     from "../assets/images/everyday-essentials.jpg";
import imgWeekend        from "../assets/images/weekend-collection.jpg";
import imgBs1            from "../assets/images/bestsell-1.jpg";
import imgBs2            from "../assets/images/bestsell-2.jpg";
import imgBs3            from "../assets/images/bestsell-3.jpg";
import imgBs4            from "../assets/images/bestsell-4.jpg";
import imgCircle1        from "../assets/images/circle-1.png";
import imgCircle2        from "../assets/images/circle-2.png";
import imgCircle3        from "../assets/images/circle-3.png";
import imgAccessories    from "../assets/images/accessories.png";
import imgHeroFashion    from "../assets/images/hero-fashion.png";

/* ─── Data ───────────────────────────────────────────────────────── */
const BRAND = "Velour";

// Section IDs for smooth-scroll
const NAV_LINKS = [
  { label: "Men",        href: "#section-men" },
  { label: "Women",      href: "#section-women" },
  { label: "Kids",       href: "#section-kids" },
  { label: "Collection", href: "#new-arrivals" },
];

const MARQUEE_WORDS = [
  "Velour", "Fashion", "Style", "Comfort", "Elegance",
  "Quality", "Crafted", "Premium", "Timeless", "Wear",
  "Velour", "Fashion", "Style", "Comfort", "Elegance",
  "Quality", "Crafted", "Premium", "Timeless", "Wear",
];

const CATEGORIES = [
  { id: "him",  label: "For Him",  img: imgCatMen,   href: "#section-men"   },
  { id: "her",  label: "For Her",  img: imgCatWomen, href: "#section-women" },
  { id: "kids", label: "For Kids", img: imgCatKids,  href: "#section-kids"  },
];

const NEW_ARRIVALS = [
  { id: "n1", title: "Casual White Linen Shirt",           price: 39.99, img: imgProd1 },
  { id: "n2", title: "Minimalist Casual Outfit Set",       price: 44.99, img: imgProd2 },
  { id: "n3", title: "Everyday Denim Jacket & Hoodie",     price: 42.99, img: imgProd3 },
  { id: "n4", title: "Signature Leather Crossbody Bag",    price: 49.99, img: imgProd4 },
];

const BEST_SELLING = [
  { id: "b1", title: "Graphic Print Casual Tee",           price: 49.99, img: imgBs1 },
  { id: "b2", title: "Adventure Explorer Tee",             price: 42.99, img: imgBs2 },
  { id: "b3", title: "Cream Cozy Knitted Sweater",         price: 44.99, img: imgBs3 },
  { id: "b4", title: "Premium Linen Blend Shirt",          price: 39.99, img: imgBs4 },
];

const TESTIMONIALS = [
  { id: "t1", name: "Priya M.",  stars: 5, title: "Dreamy Quality!",        quote: "The fabric feels premium, the fit is perfect, and the delivery was faster than expected. Definitely shopping here again." },
  { id: "t2", name: "Arjun K.", stars: 5, title: "Perfect Everyday Wear!",  quote: "Love the minimalist aesthetic. Soft on skin, holds shape after multiple washes. This is now my go-to brand." },
  { id: "t3", name: "Sofia R.", stars: 5, title: "Worth Every Penny!",       quote: "I ordered three pieces and all arrived beautifully packed. The linen shirt especially is outstanding quality." },
];

const VALUES = [
  { icon: Feather, title: "Premium Materials",     text: "Soft, breathable fabrics selected for everyday comfort." },
  { icon: Shirt,   title: "Timeless Design",        text: "Minimal silhouettes that never go out of style." },
  { icon: Recycle, title: "Sustainable Production", text: "Responsibly sourced, ethically manufactured." },
  { icon: Truck,   title: "Fast Shipping",          text: "Quick worldwide delivery with reliable tracking." },
];

/* ─── Smooth scroll helper ────────────────────────────────────────── */
function scrollTo(id) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ─── Reveal hook ─────────────────────────────────────────────────── */
function useReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true); return;
    }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(node); } },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px", ...options }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []); // eslint-disable-line
  return [ref, visible];
}

function Reveal({ as: Tag = "div", className = "", children, delay = 0, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag ref={ref}
      className={`reveal ${visible ? "reveal--on" : ""} ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
      {...rest}>
      {children}
    </Tag>
  );
}

/* ─── Toast Component ────────────────────────────────────────────── */
function Toast({ toasts }) {
  return (
    <div className="toast-stack">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast--${t.type || "info"}`}>
          <Check size={14} strokeWidth={2.5} />
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────────── */
export default function Home() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [wishlist, setWishlist]   = useState(() => new Set());
  const [cartCount, setCartCount] = useState(2);
  const [scrolled, setScrolled]   = useState(false);
  const [toasts, setToasts]       = useState([]);

  /* scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* toast helper */
  const addToast = useCallback((msg, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2800);
  }, []);

  /* wishlist toggle */
  const toggleWish = useCallback((id, title) => {
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        addToast("Removed from wishlist");
      } else {
        next.add(id);
        addToast(`Added "${title}" to wishlist ♡`);
      }
      return next;
    });
  }, [addToast]);

  /* add to cart */
  const addToCart = useCallback((title) => {
    setCartCount(c => c + 1);
    addToast(`"${title}" added to cart 🛍`);
  }, [addToast]);

  /* nav click */
  const handleNav = useCallback((e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollTo(href);
  }, []);

  return (
    <div className="vl">
      <Toast toasts={toasts} />

      {/* ── Announcement ─────────────────────────────────────────── */}
      <div className="announcement">
        <p>✦ Free Shipping on Orders Over ₹999 &nbsp;|&nbsp; New 2026 Collection — Just Dropped ✦</p>
      </div>

      {/* ── Header ───────────────────────────────────────────────── */}
      <header className={`header ${scrolled ? "header--s" : ""}`}>
        <div className="header__in">
          <button className="header__ham" aria-label="Menu"
            onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <nav className="header__nav">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className="header__link"
                onClick={e => handleNav(e, l.href)}>{l.label}</a>
            ))}
          </nav>

          <a href="#" className="header__logo" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            {BRAND}
          </a>

          <div className="header__actions">
            <button className="ibtn" aria-label="Search"
              onClick={() => addToast("Search coming soon…", "info")}>
              <Search size={19} strokeWidth={1.6} />
            </button>
            <button className="ibtn" aria-label="Account"
              onClick={() => addToast("Sign in to your account", "info")}>
              <User size={19} strokeWidth={1.6} />
            </button>
            <button className="ibtn" aria-label="Wishlist"
              onClick={() => scrollTo("#new-arrivals")}>
              <Heart size={19} strokeWidth={1.6} />
              {wishlist.size > 0 && <span className="ibtn__badge">{wishlist.size}</span>}
            </button>
            <button className="ibtn" aria-label="Cart"
              onClick={() => addToast(`${cartCount} item${cartCount !== 1 ? "s" : ""} in cart 🛍`, "info")}>
              <ShoppingBag size={19} strokeWidth={1.6} />
              {cartCount > 0 && <span className="ibtn__badge">{cartCount}</span>}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="header__mob">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className="header__mob-link"
                onClick={e => handleNav(e, l.href)}>{l.label}</a>
            ))}
          </nav>
        )}
      </header>

      <main>
        {/* ══ 1. HERO ════════════════════════════════════════════ */}
        <section className="hero" id="hero">
          <div className="hero__media">
            <img src={imgHero} alt="Velour hero fashion" className="hero__img" />
            <div className="hero__overlay" />
          </div>

          <span className="hero__tag">NEW 2026</span>
          <h1 className="hero__title">Bold Look</h1>

          <div className="hero__cta-block">
            <p className="hero__cta-desc">Discover premium everyday essentials made with exceptional fabrics.</p>
            <a href="#new-arrivals" className="btn btn--pill btn--dark"
              onClick={e => handleNav(e, "#new-arrivals")}>
              Shop Collection <ArrowRight size={15} strokeWidth={2} />
            </a>
          </div>

          <div className="hero__card" onClick={() => addToCart("Essential White Long Sleeve T-Shirt")}
            role="button" tabIndex={0} style={{ cursor: "pointer" }}>
            <img src={imgProductTshirt} alt="Essential White Long Sleeve" className="hero__card-img" />
            <div className="hero__card-body">
              <p className="hero__card-name">Essential White Long Sleeve Crew Neck T-Shirt</p>
              <p className="hero__card-price">₹39.99</p>
            </div>
            <button className="hero__card-btn" aria-label="Add to cart"
              onClick={e => { e.stopPropagation(); addToCart("Essential White Long Sleeve T-Shirt"); }}>
              <ArrowUpRight size={15} strokeWidth={2} />
            </button>
          </div>
        </section>

        {/* ══ 2. BRAND STATEMENT ═════════════════════════════════ */}
        <section className="statement">
          <div className="container">
            <Reveal className="statement__grid">
              <div className="statement__left">
                <p className="eyebrow">Our Philosophy</p>
                <h2 className="statement__h">
                  More Than Fashion.<br />Built Around You.
                </h2>
                <p className="statement__body">
                  Every piece begins with a question: will this earn its place in a life,
                  not just a wardrobe? We design in small batches, choose fabric before
                  silhouette, and finish nothing we wouldn't wear ourselves.
                </p>
                <a href="#new-arrivals" className="btn btn--pill btn--outline-dark statement__cta"
                  onClick={e => handleNav(e, "#new-arrivals")}>
                  Discover More <ArrowRight size={15} strokeWidth={2} />
                </a>
              </div>

              <div className="statement__right">
                <div className="statement__media">
                  <img src={imgCouple} alt="Couple in Velour fashion" />
                </div>
                <p className="statement__caption">
                  Every piece is thoughtfully designed using premium materials, ethical production
                  practices, and timeless aesthetics that never go out of style.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ 3. SHOP THE STYLE — CATEGORIES ═════════════════════ */}
        <section className="categories" id="section-men">
          <div className="container">
            <Reveal className="sec-head">
              <h2 className="sec-title">Shop the Style</h2>
              <p className="sec-sub">Find everything you need for every season and every occasion.</p>
            </Reveal>

            <div className="cat-grid" id="section-women">
              {CATEGORIES.map((c, i) => (
                <Reveal as="a" href={c.href} key={c.id} className="cat-card" delay={i * 80}
                  onClick={e => handleNav(e, "#new-arrivals")}>
                  <img src={c.img} alt={c.label} className="cat-card__img" />
                  <div className="cat-card__scrim" />
                  <span className="cat-card__label">{c.label.toUpperCase()}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 4. MARQUEE ══════════════════════════════════════════ */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {MARQUEE_WORDS.map((word, i) => (
              <span key={i} className="marquee__item">{word}</span>
            ))}
          </div>
        </div>

        {/* ══ 5. NEW ARRIVALS ════════════════════════════════════ */}
        <section className="arrivals" id="new-arrivals">
          <div className="container">
            <Reveal className="sec-head">
              <h2 className="sec-title">New Arrivals</h2>
              <p className="sec-sub">Explore our most-loved pieces trusted by thousands of customers.</p>
            </Reveal>

            <div className="arrivals__grid">
              {NEW_ARRIVALS.map((p, i) => {
                const fav = wishlist.has(p.id);
                return (
                  <Reveal as="article" key={p.id} className="prod-card" delay={i * 70}>
                    <div className="prod-card__media" onClick={() => addToCart(p.title)}
                      role="button" tabIndex={0} style={{ cursor: "pointer" }}>
                      <img src={p.img} alt={p.title} />
                      <button
                        className={`prod-card__fav ${fav ? "prod-card__fav--on" : ""}`}
                        onClick={e => { e.stopPropagation(); toggleWish(p.id, p.title); }}
                        aria-label={fav ? "Remove from wishlist" : "Add to wishlist"}>
                        <Heart size={15} strokeWidth={1.8} fill={fav ? "currentColor" : "none"} />
                      </button>
                      <div className="prod-card__hover-overlay">
                        <span>Quick Add</span>
                      </div>
                    </div>
                    <div className="prod-card__body">
                      <h3 className="prod-card__name">{p.title}</h3>
                      <p className="prod-card__price">₹{p.price.toFixed(2)}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal className="arrivals__cta">
              <a href="#new-arrivals" className="btn btn--pill btn--outline-dark"
                onClick={e => { e.preventDefault(); addToast("Browsing full collection…"); }}>
                New Collection <ArrowRight size={15} strokeWidth={2} />
              </a>
            </Reveal>
          </div>
        </section>

        {/* ══ 6. PROMO SPLIT ═════════════════════════════════════ */}
        <section className="promo">
          <Reveal className="promo__dark" delay={0}>
            <div className="promo__dark-inner">
              <p className="promo__off-small">FLAT</p>
              <p className="promo__off-big">20% <span>OFF</span></p>
              <h2 className="promo__heading">Summer Collection</h2>
              <p className="promo__body">
                Step into the season with modern summer essentials crafted for
                everyday comfort and effortless style.
              </p>
              <a href="#new-arrivals" className="btn btn--pill btn--white"
                onClick={e => handleNav(e, "#new-arrivals")}>
                Shop Now <ChevronRight size={15} strokeWidth={2} />
              </a>
            </div>
          </Reveal>

          <Reveal className="promo__media" delay={100}>
            <div className="promo__brand-tag">{BRAND.toUpperCase()}</div>
            <img src={imgSummer} alt="Summer collection model" className="promo__img" />
          </Reveal>
        </section>

        {/* ══ 7. VALUES ROW ══════════════════════════════════════ */}
        <section className="values">
          <div className="container">
            <div className="values__grid">
              {VALUES.map((v, i) => {
                const Icon = v.icon;
                return (
                  <Reveal key={v.title} className="val-card" delay={i * 70}>
                    <div className="val-card__icon-wrap">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <h3 className="val-card__title">{v.title}</h3>
                    <p className="val-card__body">{v.text}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══ 8. EVERYDAY ESSENTIALS + BEST SELLING ══════════════ */}
        <section className="esbs">
          {/* Row 1: Everyday Essentials & Best Selling */}
          <div className="esbs__row">
            <div className="esbs__left-col">
              <a href="#new-arrivals" className="esbs__card"
                onClick={e => handleNav(e, "#new-arrivals")}>
                <img src={imgEssentials} alt="Everyday Essentials" className="esbs__card-img" />
                <div className="esbs__card-scrim" />
                <span className="esbs__card-label">Everyday Essentials</span>
                <button className="esbs__card-btn" aria-label="Shop Essentials"
                  onClick={e => { e.preventDefault(); handleNav(e, "#new-arrivals"); }}>
                  <ArrowUpRight size={18} strokeWidth={2} />
                </button>
              </a>
            </div>

            <div className="esbs__right-col">
              <div className="esbs__right-layout">
                <div className="esbs__heading-rotated">Best Selling</div>
                <div className="esbs__right-content">
                  <p className="esbs__heading-sub">Explore our most loved pieces trusted by thousands of customers.</p>

                  <div className="esbs__list">
                    {BEST_SELLING.map((p, i) => {
                      const fav = wishlist.has("bs" + p.id);
                      return (
                        <Reveal key={p.id} as="div" className="bs-row" delay={i * 60}
                          onClick={() => addToCart(p.title)} role="button" tabIndex={0}
                          style={{ cursor: "pointer" }}>
                          <div className="bs-row__media">
                            <img src={p.img} alt={p.title} />
                            <button
                              className={`bs-row__fav ${fav ? "bs-row__fav--on" : ""}`}
                              onClick={e => { e.stopPropagation(); toggleWish("bs" + p.id, p.title); }}
                              aria-label="Add to wishlist">
                              <Heart size={13} strokeWidth={1.8} fill={fav ? "currentColor" : "none"} />
                            </button>
                          </div>
                          <div className="bs-row__body">
                            <p className="bs-row__name">{p.title}</p>
                            <p className="bs-row__price">₹{p.price.toFixed(2)}</p>
                          </div>
                          <ArrowRight size={15} strokeWidth={1.8} className="bs-row__arrow" />
                        </Reveal>
                      );
                    })}
                  </div>

                  <Reveal className="esbs__view-cta">
                    <a href="#new-arrivals" className="btn btn--pill btn--dark"
                      onClick={e => handleNav(e, "#new-arrivals")}>
                      View Collection <ArrowRight size={15} strokeWidth={2} />
                    </a>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Weekend Collection & Bangalore Map */}
          <div className="esbs__row">
            <div className="esbs__left-col">
              <a href="#new-arrivals" className="esbs__card"
                onClick={e => handleNav(e, "#new-arrivals")}>
                <img src={imgWeekend} alt="Weekend Collection" className="esbs__card-img" />
                <div className="esbs__card-scrim" />
                <span className="esbs__card-label">Weekend Collection</span>
                <button className="esbs__card-btn" aria-label="Shop Weekend"
                  onClick={e => { e.preventDefault(); handleNav(e, "#new-arrivals"); }}>
                  <ArrowUpRight size={18} strokeWidth={2} />
                </button>
              </a>
            </div>

            <div className="esbs__right-col esbs__right-col--map">
              <Reveal className="esbs__map-card" style={{ height: "100%" }}>
                <div className="esbs__map-header">
                  <h4 className="esbs__map-title">Bengaluru, India</h4>
                  <p className="esbs__map-address">Our Design Studio & Headquarters Location</p>
                </div>
                <div className="esbs__map-iframe-wrapper">
                  <iframe
                    title="Bangalore Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124408.31846985473!2d77.52554446973307!3d12.97159873030364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c100f81f%3A0x518761b7e5f96522!2sBengaluru%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ 9. BRAND PANEL + TESTIMONIALS + ACCESSORIES ════════ */}
        <section className="bta">
          {/* Col 1 — Black brand card */}
          <Reveal className="bta__brand">
            <div className="bta__brand-badge">
              <span className="bta__brand-badge-ring">
                <span>{BRAND.toUpperCase()} FASHION FOR EVERY STYLE •</span>
              </span>
              <span className="bta__brand-badge-center">{BRAND[0]}</span>
            </div>
            <div className="bta__brand-tagline">
              <p>Style Starts With</p>
              <p>Confidence And</p>
              <p>Ends With Comfort.</p>
            </div>
            <p className="bta__brand-desc">
              Explore premium-quality clothing designed with modern style, exceptional
              comfort, and timeless elegance to help you look confident wherever life takes you.
            </p>
            <div className="bta__brand-circles">
              <div className="bta__circle"><img src={imgCircle1} alt="" /></div>
              <div className="bta__circle"><img src={imgCircle2} alt="" /></div>
              <div className="bta__circle"><img src={imgCircle3} alt="" /></div>
            </div>
          </Reveal>

          {/* Col 2 — Testimonials */}
          <div className="bta__testimonials">
            <Reveal className="bta__test-heading">
              <h2 className="bta__test-title">Loved by Thousands</h2>
            </Reveal>
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.id} className="bta__test-card" delay={i * 80}>
                <div className="bta__stars">{"★".repeat(t.stars)}</div>
                <p className="bta__test-quote-title">"{t.title}"</p>
                <p className="bta__test-quote">"{t.quote}"</p>
                <p className="bta__test-name">— {t.name}</p>
              </Reveal>
            ))}
          </div>

          {/* Col 3 — Accessories */}
          <Reveal className="bta__accessories">
            <div className="bta__acc-heading">
              <h2 className="bta__acc-title">Accessories</h2>
              <p className="bta__acc-sub">Complete your look with our carefully curated collection of premium accessories.</p>
              <nav className="bta__acc-links">
                {["For Her", "For Him", "For Kids"].map(link => (
                  <a key={link} href="#new-arrivals" className="bta__acc-link"
                    onClick={e => handleNav(e, "#new-arrivals")}>
                    {link} <ArrowRight size={12} strokeWidth={2} />
                  </a>
                ))}
              </nav>
            </div>
            <div className="bta__acc-images">
              <img src={imgAccessories} alt="Accessories top"    className="bta__acc-img" />
              <img src={imgHeroFashion} alt="Accessories fashion" className="bta__acc-img" />
            </div>
          </Reveal>
        </section>

        {/* ══ 10. NEWSLETTER ═════════════════════════════════════ */}
        <section className="newsletter">
          <Reveal className="newsletter__inner">
            <div className="newsletter__text">
              <h2 className="newsletter__heading">Upgrade Your Everyday Wardrobe</h2>
              <p className="newsletter__sub">Premium clothing designed for comfort, confidence, and effortless style.</p>
            </div>
            <form className="newsletter__form" onSubmit={e => { e.preventDefault(); addToast("You're subscribed! Welcome to Velour ✓"); }}>
              <input type="email" placeholder="Email address" className="newsletter__input" required />
              <button type="submit" className="btn btn--pill btn--dark">
                Subscribe <ArrowRight size={15} strokeWidth={2} />
              </button>
            </form>
          </Reveal>
        </section>
      </main>

      {/* ── Footer — minimal 2-line ──────────────────────────────── */}
      <footer className="footer">
        <div className="footer__main">
          <a href="#" className="footer__logo"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            {BRAND.toUpperCase()}
          </a>

          <nav className="footer__links">
            {["Men", "Women", "Kids", "New Arrivals", "About", "Contact"].map(l => (
              <a key={l} href="#new-arrivals" className="footer__link"
                onClick={e => handleNav(e, "#new-arrivals")}>{l}</a>
            ))}
          </nav>

          <div className="footer__socials">
            {[
              { label: "Facebook",  iconClass: "bi bi-facebook" },
              { label: "Instagram", iconClass: "bi bi-instagram" },
              { label: "Twitter",   iconClass: "bi bi-twitter-x" },
              { label: "YouTube",   iconClass: "bi bi-youtube" },
            ].map(s => (
              <a key={s.label} href="#" className="footer__social-btn"
                aria-label={s.label}
                target="_blank" rel="noopener noreferrer">
                <i className={s.iconClass}></i>
              </a>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} {BRAND}. All rights reserved.</p>
          <nav className="footer__legal">
            {["Privacy Policy", "Terms of Use", "Shipping Policy"].map(l => (
              <a key={l} href="#" className="footer__legal-link"
                onClick={e => { e.preventDefault(); addToast(`${l} — coming soon`); }}>
                {l}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
