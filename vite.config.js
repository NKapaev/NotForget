import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,   // чтобы видеть нормальный стек-трейс
  },
  server: {
    port: "3000",
    sourcemapIgnoreList: false, // помогает при отладке в браузере
  }
})
