import { defineConfig } from "tsup";
import { copyFileSync, mkdirSync } from "fs";
import { resolve } from "path";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "tailwindcss"],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
  onSuccess: async () => {
    mkdirSync("dist", { recursive: true });
    copyFileSync(
      resolve("src/tokens/tokens.css"),
      resolve("dist/tokens.css")
    );
    console.log("✓ tokens.css copied to dist/");
  },
});
