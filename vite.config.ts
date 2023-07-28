import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import zipPack from 'vite-plugin-zip-pack'
import icons from 'unplugin-icons/vite'

// import unfonts from 'unplugin-fonts/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    icons({ autoInstall: true, compiler: 'jsx', jsx: 'react' }),
    zipPack({ outDir: 'dist' }),
    // unfonts({
    //   custom: {
    //     families: [{
    //       name: 'Noto Sans Symbols',
    //       local: 'Noto Sans Symbols Regular',
    //       src: '*.woff2',
    //     }],
    //     display: 'auto',
    //     preload: true,
    //     prefetch: false,
    //     injectTo: 'head-prepend',
    //   },
    // }),
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
