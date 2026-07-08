import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev
export default defineConfig({
  base: '/Venta-Website-Templates/', // ✨ Updated to match your exact repository name
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: 'localhost', 
    port: 5173
  }
});
