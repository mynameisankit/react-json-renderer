import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

const root = resolve(__dirname, './src');

export default defineConfig({
  resolve: {
    alias: {
      "@": root,
      "@/constants": resolve(root, './constants'),
      "@/types": resolve(root, './constants'),
      "@/builders": resolve(root, './builders'),
    },
  },
  build: {
    lib: {
      entry: resolve(root, 'index.ts'),
      formats: ['es']
    }
  },
  plugins: [react()],
});
