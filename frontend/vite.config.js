import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Change Vite's default port to 3000
  },
  hmr: {
    protocol: 'ws',
    host: 'localhost',
    port: 3000,
    clientPort: 3000, // Fix WebSocket connection issue
  },
});
