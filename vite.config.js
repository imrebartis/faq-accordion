import { defineConfig } from 'vite';

export default defineConfig({
  base: '/faq-accordion/',
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (
            assetInfo.name.endsWith('.css') ||
            assetInfo.name.endsWith('.css.map')
          ) {
            return 'assets/styles/[name][extname]';
          }
          return 'assets/[name][extname]';
        },
        entryFileNames: 'assets/js/[name].js',
      },
    },
  },
  css: {
    devSourcemap: true,
  },
});
