import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import viteImagemin from "vite-plugin-imagemin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: "brotliCompress" }),
    viteCompression({ algorithm: "gzip" }),
    viteImagemin({
      gifsicle: { optimizationLevel: 3 },
      optipng: { optimizationLevel: 5 },
      mozjpeg: { quality: 80 },
      svgo: { plugins: [{ name: "removeViewBox", active: false }] },
      webp: { quality: 80 },
    }),
    visualizer({
      filename: "dist/stats.html",
      template: "treemap",
      gzipSize: true,
    }),
  ],
  server: {
    watch: {
      ignored: ["**/coverage/**"],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("three") || id.includes("@react-three")) {
              return "three";
            }
            if (id.includes("framer-motion")) {
              return "motion";
            }
            if (id.includes("@supabase")) {
              return "auth";
            }
            return "vendor";
          }
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.js",
    exclude: [
      "node_modules/**",
      "dist/**",
      ".idea/**",
      ".git/**",
      ".cache/**",
      "e2e/**",
      "playwright.config.ts",
    ],
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["src/utils/**", "src/hooks/**"],
      thresholds: { lines: 90, functions: 90, statements: 90, branches: 60 },
    },
  },
});
