import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import sitemap from 'vite-plugin-sitemap';
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://www.moinnaik.bio',
      outDir: 'dist',
      urls: [
        { url: '/', changefreq: 'weekly', priority: 1.0 },
        { url: '/post-testimonial', changefreq: 'monthly', priority: 0.8 },
        { url: '/admin', changefreq: 'monthly', priority: 0.5 },
        { url: '/admin/dashboard', changefreq: 'weekly', priority: 0.6 },
      ],
    }),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Moin MN | Portfolio",
        short_name: "Moin MN",
        description: "Discover my expertise in MERN Stack, Next.js, and full-stack web development. I specialize in building scalable, high-performance applications, delivering innovative solutions, and crafting seamless user experiences. Explore my projects, services, and technical skills.",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/logo-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/logo-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
