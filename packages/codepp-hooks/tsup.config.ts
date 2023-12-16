import { defineConfig } from "tsup";
import { devDependencies } from "./package.json";

export default defineConfig((options) => {
  return {
    minify: !options.watch,
    sourcemap: true,
    format: ["cjs", "esm"],
    dts: true,
    clean: true,
    external: [...Object.keys(devDependencies)],
  };
});
