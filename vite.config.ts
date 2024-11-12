import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [Vue()],
  build: {
    lib: {
      entry: resolve(__dirname, './src/main.ts'),
      name: 'WordCloudTunnel',
      fileName: 'wordcloudtunnel',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
