// vite.config.ts
import { defineConfig } from "file:///D:/projet/drawer/node_modules/vite/dist/node/index.js";
import { resolve } from "node:path";
import dts from "file:///D:/projet/drawer/node_modules/vite-plugin-dts/dist/index.mjs";
import { execSync } from "child_process";
var __vite_injected_original_dirname = "D:\\projet\\drawer";
var vite_config_default = defineConfig({
  build: {
    cssMinify: true,
    minify: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__vite_injected_original_dirname, "src/Drawer.ts"),
      name: "Drawer",
      // the proper extensions will be added
      fileName: "drawer",
      formats: ["iife", "cjs", "es", "umd"]
    }
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true
    }),
    {
      name: "postbuild-commands",
      // the name of your custom plugin. Could be anything.
      closeBundle: async () => {
        console.log("Build docs...");
        execSync("npm run build:docs");
        console.log("Docs build !");
      }
    }
  ],
  resolve: {
    alias: {
      find: "~",
      replacement: resolve(__vite_injected_original_dirname, "src")
    }
  },
  test: {
    server: {
      deps: {
        inline: ["vitest-canvas-mock"]
      }
    },
    setupFiles: ["./vitest.setup.ts"],
    environment: "jsdom",
    threads: false,
    // For this config, check https://github.com/vitest-dev/vitest/issues/740
    environmentOptions: {
      jsdom: {
        resources: "usable"
      }
    },
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
      "**/e2e/**"
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZXRcXFxcZHJhd2VyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxwcm9qZXRcXFxcZHJhd2VyXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9wcm9qZXQvZHJhd2VyL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ25vZGU6cGF0aCc7XHJcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcclxuaW1wb3J0IHsgZXhlY1N5bmMgfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBidWlsZDoge1xyXG4gICAgY3NzTWluaWZ5OiB0cnVlLFxyXG4gICAgbWluaWZ5OiBmYWxzZSxcclxuICAgIGxpYjoge1xyXG4gICAgICAvLyBDb3VsZCBhbHNvIGJlIGEgZGljdGlvbmFyeSBvciBhcnJheSBvZiBtdWx0aXBsZSBlbnRyeSBwb2ludHNcclxuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL0RyYXdlci50cycpLFxyXG4gICAgICBuYW1lOiAnRHJhd2VyJyxcclxuICAgICAgLy8gdGhlIHByb3BlciBleHRlbnNpb25zIHdpbGwgYmUgYWRkZWRcclxuICAgICAgZmlsZU5hbWU6ICdkcmF3ZXInLFxyXG4gICAgICBmb3JtYXRzOiBbJ2lpZmUnLCAnY2pzJywgJ2VzJywgJ3VtZCddLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIGR0cyh7XHJcbiAgICAgIGluc2VydFR5cGVzRW50cnk6IHRydWUsXHJcbiAgICAgIHJvbGx1cFR5cGVzOiB0cnVlXHJcbiAgICB9KSxcclxuICAgIHtcclxuICAgICAgbmFtZTogJ3Bvc3RidWlsZC1jb21tYW5kcycsIC8vIHRoZSBuYW1lIG9mIHlvdXIgY3VzdG9tIHBsdWdpbi4gQ291bGQgYmUgYW55dGhpbmcuXHJcbiAgICAgIGNsb3NlQnVuZGxlOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0J1aWxkIGRvY3MuLi4nKVxyXG4gICAgICAgIGV4ZWNTeW5jKFwibnBtIHJ1biBidWlsZDpkb2NzXCIpIC8vIHJ1biBkdXJpbmcgY2xvc2VCdW5kbGUgaG9vay4gaHR0cHM6Ly9yb2xsdXBqcy5vcmcvZ3VpZGUvZW4vI2Nsb3NlYnVuZGxlXHJcbiAgICAgICAgY29uc29sZS5sb2coJ0RvY3MgYnVpbGQgIScpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICBmaW5kOiAnficsXHJcbiAgICAgIHJlcGxhY2VtZW50OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHRlc3Q6IHtcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBkZXBzOiB7XHJcbiAgICAgICAgaW5saW5lOiBbJ3ZpdGVzdC1jYW52YXMtbW9jayddLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHNldHVwRmlsZXM6IFsnLi92aXRlc3Quc2V0dXAudHMnXSxcclxuICAgIGVudmlyb25tZW50OiAnanNkb20nLFxyXG4gICAgdGhyZWFkczogZmFsc2UsXHJcbiAgICAvLyBGb3IgdGhpcyBjb25maWcsIGNoZWNrIGh0dHBzOi8vZ2l0aHViLmNvbS92aXRlc3QtZGV2L3ZpdGVzdC9pc3N1ZXMvNzQwXHJcbiAgICBlbnZpcm9ubWVudE9wdGlvbnM6IHtcclxuICAgICAganNkb206IHtcclxuICAgICAgICByZXNvdXJjZXM6ICd1c2FibGUnLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGV4Y2x1ZGU6IFtcclxuICAgICAgJyoqL25vZGVfbW9kdWxlcy8qKicsXHJcbiAgICAgICcqKi9kaXN0LyoqJyxcclxuICAgICAgJyoqL2N5cHJlc3MvKionLFxyXG4gICAgICAnKiovLntpZGVhLGdpdCxjYWNoZSxvdXRwdXQsdGVtcH0vKionLFxyXG4gICAgICAnKiove2thcm1hLHJvbGx1cCx3ZWJwYWNrLHZpdGUsdml0ZXN0LGplc3QsYXZhLGJhYmVsLG55YyxjeXByZXNzLHRzdXAsYnVpbGR9LmNvbmZpZy4qJyxcclxuICAgICAgJyoqL2UyZS8qKicsXHJcbiAgICBdLFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sU0FBUztBQUNoQixTQUFTLGdCQUFnQjtBQUp6QixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixLQUFLO0FBQUE7QUFBQSxNQUVILE9BQU8sUUFBUSxrQ0FBVyxlQUFlO0FBQUEsTUFDekMsTUFBTTtBQUFBO0FBQUEsTUFFTixVQUFVO0FBQUEsTUFDVixTQUFTLENBQUMsUUFBUSxPQUFPLE1BQU0sS0FBSztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0Ysa0JBQWtCO0FBQUEsTUFDbEIsYUFBYTtBQUFBLElBQ2YsQ0FBQztBQUFBLElBQ0Q7QUFBQSxNQUNFLE1BQU07QUFBQTtBQUFBLE1BQ04sYUFBYSxZQUFZO0FBQ3ZCLGdCQUFRLElBQUksZUFBZTtBQUMzQixpQkFBUyxvQkFBb0I7QUFDN0IsZ0JBQVEsSUFBSSxjQUFjO0FBQUEsTUFDNUI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsTUFBTTtBQUFBLE1BQ04sYUFBYSxRQUFRLGtDQUFXLEtBQUs7QUFBQSxJQUN2QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxRQUNKLFFBQVEsQ0FBQyxvQkFBb0I7QUFBQSxNQUMvQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFlBQVksQ0FBQyxtQkFBbUI7QUFBQSxJQUNoQyxhQUFhO0FBQUEsSUFDYixTQUFTO0FBQUE7QUFBQSxJQUVULG9CQUFvQjtBQUFBLE1BQ2xCLE9BQU87QUFBQSxRQUNMLFdBQVc7QUFBQSxNQUNiO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1A7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
