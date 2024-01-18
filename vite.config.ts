/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';
import { execSync } from 'child_process';
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  build: {
    sourcemap: true,
    cssMinify: true,
    minify: false,
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/Drawer.ts'),
      name: 'Drawer',
      // the proper extensions will be added
      fileName: 'drawer',
      formats: ['iife', 'cjs', 'es', 'umd'],
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    },
    ),
    svgLoader(),
    {
      name: 'postbuild-commands', // the name of your custom plugin. Could be anything.
      closeBundle: async () => {
        if (process.env.NODE_ENV !== 'test') {
          console.log('Build docs...');
          execSync('npm run build:docs'); // run during closeBundle hook. https://rollupjs.org/guide/en/#closebundle
          console.log('Docs build !');
        }
      },
    },
  ],
  resolve: {
    alias: {
      find: '~',
      replacement: resolve(__dirname, 'src'),
    },
  },
  server: {
    open: process.env.NODE_ENV !== 'test',
  },
  test: {
    server: {
      deps: {
        inline: ['vitest-canvas-mock'],
      },
    },
    setupFiles: ['./vitest.setup.ts'],
    environment: 'jsdom',
    threads: false,
    // For this config, check https://github.com/vitest-dev/vitest/issues/740
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
      '**/e2e/**',
    ],
  },
});
