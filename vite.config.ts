/// <reference types="vitest" />
import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  build: {
    minify: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(__dirname, "src/Drawer.ts"),
      name: "Drawer",
      // the proper extensions will be added
      fileName: "drawer",
      formats: ["iife", "cjs", "es", "umd"],
    },
  },
  resolve: {
    alias: {
      find: "~",
      replacement: path.resolve(__dirname, "src"),
    },
  },
  test: {
    setupFiles: ["./vitest.setup.ts"],
    environment: "jsdom",
    threads: false,
    deps: {
      inline: ["vitest-canvas-mock"],
    },
    // For this config, check https://github.com/vitest-dev/vitest/issues/740
    environmentOptions: {
      jsdom: {
        resources: "usable",
      },
    },
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
      "**/e2e/**",
    ],
  },
});
