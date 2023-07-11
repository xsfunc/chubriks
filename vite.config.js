import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import zipPack from 'vite-plugin-zip-pack'
import icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    icons({ autoInstall: true, compiler: 'jsx', jsx: 'react' }),
    zipPack({ outDir: 'dist' }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },

  build: {
    chunkSizeWarningLimit: 666,
  },
  // relative path for build
  base: '',
})
