import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add any required Node.js built-in modules here
      stream: 'stream-browserify',
      buffer: 'buffer',
    }
  },
  optimizeDeps: {
    exclude: ['stream', 'buffer']
  },
});
