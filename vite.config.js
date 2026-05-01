import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // Sunucuyu zorla IPv4 üzerinde başlatır
    port: 5173,
    strictPort: true, // Port doluysa başka porta geçmek yerine hata verir
  }
})