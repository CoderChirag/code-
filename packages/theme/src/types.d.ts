import { type Dispatch, type SetStateAction } from "react";

export type CSSVar = `--${string}`;

export interface ThemeContextType {
  name: string;
  theme: ITheme;
  setTheme: Dispatch<SetStateAction<ITheme>>;
}

export type HEXcolor = `#${string}`;
export type RGBcolor = `rgb(${number}, ${number}, ${number})`;
export type RGBAcolor = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HSLcolor = `hsl(${number}, ${number}%, ${number}%)`;
export type HSLAcolor = `hsla(${number}, ${number}%, ${number}%, ${number})`;

export type Color = HEXcolor | RGBcolor | RGBAcolor | HSLcolor | HSLAcolor;

export interface BasicPalette {
  background: Color;
  foreground: Color;
  border: Color;
}
export interface ColorPalette extends BasicPalette {
  resizer: Color;
  titleBar: Omit<BasicPalette, "border"> & {
    titleWindow: BasicPalette & {
      hover: BasicPalette;
      inactive: BasicPalette;
    };
  };
  statusBar: Omit<BasicPalette, "border"> & {
    secondary: Omit<BasicPalette, "border"> & {
      hover: Omit<BasicPalette, "border">;
    };
    hover: Omit<BasicPalette, "border">;
  };
  sideBar: Omit<BasicPalette, "border"> & {
    primary: Omit<BasicPalette, "border">;
    secondary: {
      background: Color;
    };
    active: {
      foreground: Color;
    };
  };
  solutionBar: Omit<BasicPalette, "border"> & {
    selection: BasicPalette;
    hover: {
      background: Color;
    };
  };
  // editorGroup: BasicPalette;
  // editor: BasicPalette;
  // panel: BasicPalette;
}

export interface Fonts {
  urls: {
    name: string;
    url: string;
  }[];
  primary: string;
  editor: string;
}

export interface ITheme {
  name: string;
  colors: ColorPalette;
  fonts: Fonts;
}
