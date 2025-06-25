import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: './client',
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    target: 'es2015',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@shared': path.resolve(__dirname, './shared'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: false,
    hmr: {
      clientPort: 443 // Use 443 for HTTPS
    },
    allowedHosts: ['*'] // Allow all hosts for development
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: false,
  },
  base: '', // Ensure this is an empty string for relative paths
})
