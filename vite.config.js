import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync } from 'node:fs'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      // Cloudflare Pages SPA routing fix:
      // Copies dist/index.html → dist/404.html after every production build.
      // Cloudflare serves 404.html for any route that has no matching static
      // file, so React Router takes over client-side — no _redirects loop.
      name: 'cloudflare-spa-404',
      closeBundle() {
        try {
          copyFileSync('dist/index.html', 'dist/404.html')
        } catch {
          // dev mode — dist doesn't exist yet, safe to ignore
        }
      },
    },
  ],
})
