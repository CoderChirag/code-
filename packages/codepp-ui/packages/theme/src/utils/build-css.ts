import type { CSSVar, Color, ColorPalette } from "../types";

type ColorPaletteValue =
  | string
  | number
  | {
      [key: string]: ColorPaletteValue;
    };
type StackItem = { prefix: CSSVar; val: ColorPaletteValue };

export const buildCSSVars = (obj: ColorPaletteValue, prefix: string = "") => {
  let css = "";
  const stack = new Array<StackItem>();

  stack.push({
    prefix: `--${prefix}`,
    val: obj,
  });
  while (stack.length > 0) {
    const { prefix, val } = stack.pop() as StackItem;
    if (typeof val !== "object") {
      css += `${prefix}: ${val};`;
    } else {
      for (const [key, value] of Object.entries(val).reverse()) {
        stack.push({ prefix: `${prefix}-${key}`, val: value });
      }
    }
  }

  return css;
};
