import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/chat': {
        target: 'https://cprgpt.itsfait.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chat/, '/ask'),
      },
    },
  },
});
