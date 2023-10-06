/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    cssMinify: true,
    minify: false,
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
      rollupTypes: true
    }),
  ],
  resolve: {
    alias: {
      find: '~',
      replacement: resolve(__dirname, 'src'),
    },
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
