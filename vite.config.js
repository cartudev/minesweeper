import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    // config options
    assetsInclude: ['./*.webp'],
    base: '/minesweeper/',
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
      },
    },
  })