import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For future extensions with TS
// import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'useObjectReact',
      fileName: 'useObject',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
})
