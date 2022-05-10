import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
  server: {
    port: 3000,
    host: true,
    open: true,
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@foodtok-types': path.resolve(__dirname, './src/types'),
      '@apis': path.resolve(__dirname, './src/api'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@context': path.resolve(__dirname, './src/context'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@util': path.resolve(__dirname, './src/util'),
    },
  },
});
