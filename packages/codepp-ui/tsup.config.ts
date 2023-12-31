import { type Options, defineConfig } from "tsup";
import { devDependencies } from "./package.json";

function getBaseConfig(options: Options): Options {
  return {
    minify: !options.watch,
    sourcemap: true,
    format: ["cjs", "esm"],
    dts: true,
    clean: true,
    external: [...Object.keys(devDependencies)],
    tsconfig: "tsconfig.json",
  };
}

export default defineConfig((options) => {
  const baseConfig = getBaseConfig(options);
  return [
    {
      entry: ["src/index.ts"],
      ...baseConfig,
    },
    {
      entry: ["src/icons/index.ts"],
      outDir: "icons",
      ...baseConfig,
    },
  ];
});
