import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    minifyIdentifiers: false // required so that names for refs that should be persistent in vue composition api components don't get minified
  },
  plugins: [
    vue(),
    basicSsl()
  ]
})
