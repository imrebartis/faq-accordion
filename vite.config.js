import { defineConfig } from 'vite';

export default defineConfig({
  base: '/faq-accordion/',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.js'],
  },
});
