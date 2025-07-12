import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Allows to import library without publishing it
      // eslint-disable-next-line no-undef
      'use-object-react': path.resolve(__dirname, '../src'),
    },
  },
})
