import { defineConfig, configDefaults } from 'vitest/config';
import path from 'path';

export default defineConfig({
  // resolve: {
  //   alias: {
  //     node_modules: path.resolve(__dirname, '../node_modules'),
  //   },
  // },
  test: {
    exclude: [
      ...configDefaults.exclude,
      '../node_modules/@primer/react/lib-esm',
      '../node_modules/@primer/react/lib-esm/index.js',
      'src/components/Connector/Connector.tsx',
      '../node_modules/@primer/react/lib-esm/PageLayout/useStickyPaneHeight.js',
    ],
  },
});
