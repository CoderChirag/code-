import { defineConfig } from "tsup";
import { devDependencies } from "./package.json";

export default defineConfig((options) => {
  return {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    clean: true,
    external: [...Object.keys(devDependencies)],
    tsconfig: "tsconfig.json",
  };
});
