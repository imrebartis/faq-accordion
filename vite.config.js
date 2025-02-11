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
          if (/\.(gif|jpe?g|png|svg)$/i.test(assetInfo.name)) {
            return 'assets/images/[name][extname]';
          }
          return 'assets/[name][extname]';
        },
        entryFileNames: 'assets/js/[name].js',
      },
    },
    assetsDir: 'assets',
    assetsInlineLimit: 0,
  },
  css: {
    devSourcemap: true,
  },
});
