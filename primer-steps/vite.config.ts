import typescript from '@rollup/plugin-typescript';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
const path = require('path');

const isExternal = (id: string) => !id.startsWith('.') && !path.isAbsolute(id);
const resolvePath = (str: string) => path.resolve(__dirname, str);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: isExternal,
      output: {
        globals: {
          react: 'react',
          'framer-motion': 'framer-motion',
          'react/jsx-runtime': 'react/jsx-runtime',
          '@primer/react': '@primer/react',
          '@primer/octicons-react': '@primer/octicons-react',
        },
      },
      plugins: [
        typescript({
          target: 'ESNext',
          rootDir: resolvePath('./src'),
          declaration: true,
          declarationDir: resolvePath('./dist'),
          exclude: resolvePath('./node_modules/**'),
          allowSyntheticDefaultImports: true,
        }),
      ],
    },
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'primer-steps',
    },
  },
});
