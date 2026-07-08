import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev
export default defineConfig({
  base: '/', // ✨ Updated to single slash for apex root domains
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: 'localhost', 
    port: 5173
  }
});
