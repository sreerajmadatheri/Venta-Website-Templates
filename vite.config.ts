import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev
export default defineConfig({
  base: '/', // 💎 Ensures assets look directly at the root of ventaailabs.com
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: 'localhost', 
    port: 5173
  }
});
