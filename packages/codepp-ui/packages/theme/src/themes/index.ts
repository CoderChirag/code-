import { basicDarkPalette, darkColorPalette } from "./dark";
import type {
  BasicPalette,
  Color,
  ColorPalette,
  Fonts,
  ITheme,
} from "../types";
import type { DeepPartial } from "../utils/types";
import { basicLightPalette, lightColorPalette } from "./light";

type RawTheme = Omit<ITheme, "colors"> & {
  colors: BasicPalette & { borderColor: Color } & DeepPartial<ColorPalette>;
};
export class ThemeBuilder {
  basicPalette: BasicPalette;
  theme: ITheme;
  constructor(type: "dark" | "light", theme?: RawTheme) {
    if (type === "dark") this.basicPalette = basicDarkPalette;
    else this.basicPalette = basicLightPalette;

    this.theme = {
      name: type === "dark" ? "default-dark" : "default-light",
      colors:
        type === "dark" ? { ...darkColorPalette } : { ...lightColorPalette },
      fonts: {
        urls: [],
        primary:
          "-apple-system,BlinkMacSystemFont,Segoe WPC,Segoe UI,system-ui,Ubuntu,Droid Sans,sans-serif",
        editor:
          '"SF Mono",Monaco,Menlo,Courier,Consolas,"Ubuntu Mono","Liberation Mono","DejaVu Sans Mono","Courier New",monospace',
      },
    };

    if (theme) this.build(theme);
  }

  private build(theme: RawTheme) {
    this.theme.name = theme.name;
    this.buildColors(theme.colors);
    this.buildFonts(theme.fonts);
  }

  private buildColors(
    colors: BasicPalette & { borderColor: Color } & DeepPartial<ColorPalette>
  ) {
    const basicPalette = {
      backgroundPrimary: colors.backgroundPrimary,
      backgroundSecondary: colors.backgroundSecondary,
      foregroundPrimary: colors.foregroundPrimary,
      foregroundSecondary: colors.foregroundSecondary,
      selectionBackground: colors.selectionBackground,
      selectionForeground: colors.selectionForeground,
      hoverBackground: colors.hoverBackground,
      hoverForeground: colors.hoverForeground,
    };

    this.theme.colors = {
      ...basicPalette,
      borderColor: colors.borderColor,
      titleBar: {
        backgroundPrimary: colors.backgroundPrimary,
        backgroundSecondary: colors.backgroundSecondary,
        foregroundPrimary: colors.foregroundPrimary,
        foregroundSecondary: colors.foregroundSecondary,
        hoverBackground: colors.hoverBackground,
        hoverForeground: colors.hoverForeground,
        ...colors?.titleBar,
      },
      sideBar: {
        ...basicPalette,
        ...colors?.sideBar,
      },
      explorer: {
        ...basicPalette,
        ...colors?.explorer,
      },
      editorGroup: {
        ...basicPalette,
        ...colors?.editorGroup,
      },
      editor: {
        ...basicPalette,
        ...colors.editor,
      },
      panel: {
        ...basicPalette,
        ...colors?.panel,
      },
      statusBar: {
        ...basicPalette,
        ...colors?.statusBar,
      },
    };
  }

  private buildFonts(fonts: Fonts) {
    this.theme.fonts = {
      ...fonts,
    };
  }

  public getTheme(): ITheme {
    return this.theme;
  }
}
