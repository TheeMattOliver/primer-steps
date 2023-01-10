import { defineConfig, configDefaults } from 'vitest/config';
import path from 'path';

export default defineConfig({
  // resolve: {
  //   alias: {
  //     node_modules: path.resolve(__dirname, '../node_modules'),
  //   },
  // },
  test: {
    exclude: ['../node_modules/@primer/react'],
  },
});
