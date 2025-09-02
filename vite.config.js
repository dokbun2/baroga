import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages uses /baroga/ path, Netlify uses root /
  base: process.env.GITHUB_PAGES ? '/baroga/' : '/',
})
