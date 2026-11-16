import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// 개발 서버는 5173을 고정하고, /api 요청은 백엔드 8080으로 넘긴다.
export default defineConfig(({ command }) => ({
  // 운영에서는 가족캘린더와 같은 도메인의 /profile 경로로 올린다.
  base: command === 'build' ? '/profile/' : '/',
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
}))
