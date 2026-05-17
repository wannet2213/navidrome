import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import { createManualChunks } from './src/manual-chunks'

export default defineConfig({
  plugins: [react()],
  base: '/client/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      cy: path.resolve(__dirname, './cypress'),
    },
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    rollupOptions: {
      external: ['bufferutil', 'utf-8-validate'],
      output: {
        manualChunks: createManualChunks,
      },
    },
  },
})
