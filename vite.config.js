import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages project sites are served from https://<user>.github.io/<repo>/,
// so built asset URLs need that prefix. The workflow sets BASE_PATH=/<repo>/.
// Locally (and for a <user>.github.io user site) it falls back to '/'.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [vue()],
})
