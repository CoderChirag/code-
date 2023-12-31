import { defineConfig } from "tsup";
import { devDependencies } from "./package.json";

export default defineConfig((options) => {
  return [
    {
      entry: ["src/index.ts"],
      minify: !options.watch,
      sourcemap: true,
      format: ["cjs", "esm"],
      dts: true,
      clean: true,
      external: [...Object.keys(devDependencies)],
    },
    {
      entry: ["src/icons/index.ts"],
      outDir: "icons",
      minify: !options.watch,
      sourcemap: true,
      format: ["cjs", "esm"],
      dts: true,
      clean: true,
      external: [...Object.keys(devDependencies)],
    },
  ];
});
