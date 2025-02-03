import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';
import svgr from 'vite-plugin-svgr';

import path from 'path';

const __dirname = path.resolve();

export default defineConfig({
  plugins: [react(), svgr(), mkcert({ certFileName: './localhost.pem', keyFileName: './localhost-key.pem' })],
  server: {
    https: true,
    cors: {
      origin: 'https://api.bbaegok.store/backend',
      credentials: true,
    },
  },

  resolve: {
    alias: [
      {
        find: 'assets',
        replacement: path.resolve(__dirname, 'src/assets'),
      },
      {
        find: 'components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      {
        find: 'hooks',
        replacement: path.resolve(__dirname, 'src/hooks'),
      },
      {
        find: 'pages',
        replacement: path.resolve(__dirname, 'src/pages'),
      },
      {
        find: 'services',
        replacement: path.resolve(__dirname, 'src/services'),
      },
      {
        find: 'types',
        replacement: path.resolve(__dirname, 'src/types'),
      },
      {
        find: 'utils',
        replacement: path.resolve(__dirname, 'src/utils'),
      },
      {
        find: 'constants',
        replacement: path.resolve(__dirname, 'src/constants'),
      },
      {
        find: 'stores',
        replacement: path.resolve(__dirname, 'src/stores'),
      },
    ],
  },
});
