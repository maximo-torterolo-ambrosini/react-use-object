import { defineConfig } from 'vite'

// For future extensions with TS
// import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'useObjectReact',
      fileName: 'useObject',
      formats: ['es', 'cjs'],
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  test: {
    environment: 'jsdom',
  } })
