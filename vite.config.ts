import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use repository name from environment or default to root
  base: process.env.NODE_ENV === 'production' 
    ? (process.env.GITHUB_REPOSITORY?.split('/')[1] ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/` : '/')
    : '/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});