import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const page = (path) => fileURLToPath(new URL(path, import.meta.url));

// The portfolio plus five standalone sample sites. Each site is its own HTML
// entry so it gets a real URL (/work/<slug>/) and fully isolated styles.
const pages = {
  main: page('./index.html'),
  marigold: page('./work/marigold/index.html'),
  kurinji: page('./work/kurinji/index.html'),
  stillwater: page('./work/stillwater/index.html'),
  ninefold: page('./work/ninefold/index.html'),
  'bonjour-pondy': page('./work/bonjour-pondy/index.html'),
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: pages,
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
