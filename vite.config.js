import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/dress-landing-page/',
  plugins: [react()],
  server: {
    watch: {
      // Exclude large binary folders from the file watcher to prevent EBUSY errors
      ignored: ['**/src/assets/images/**', '**/node_modules/**'],
    },
  },
})
