import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // IMPORTANT: Must match repo name exactly
  base: '/forZ/',

  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',

      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'masked-icon.svg'
      ],

      manifest: {
        name: 'Zalia',
        short_name: 'Zalia',
        description: 'A private, mobile-first love page',

        // Critical for GitHub Pages subpath
        start_url: '/forZ/',
        scope: '/forZ/',

        display: 'standalone',
        theme_color: '#1a202c',

        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },

      // Make SPA routing work on Pages
      workbox: {
        navigateFallback: '/forZ/index.html'
      }
    })
  ]
});
