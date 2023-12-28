import { type Dispatch, type SetStateAction } from "react";

export type CSSVar = `--${string}`;

export interface ThemeContextType {
  name: string;
  theme: ITheme;
  setTheme: Dispatch<SetStateAction<ITheme>>;
}

export type HEXcolor = `#${string}`;
export type RGBcolor = `rgb(${number}, ${number}, ${number})`;
export type HSLcolor = `hsl(${number}, ${number}%, ${number}%)`;
export type HSLAcolor = `hsla(${number}, ${number}%, ${number}%, ${number})`;

export type Color = HEXcolor | RGBcolor | HSLcolor | HSLAcolor;

export interface BasicPalette {
  backgroundPrimary: Color;
  backgroundSecondary: Color;
  foregroundPrimary: Color;
  foregroundSecondary: Color;
  selectionBackground: Color;
  selectionForeground: Color;
  hoverBackground: Color;
  hoverForeground: Color;
}
export interface ColorPalette extends BasicPalette {
  borderColor: Color;
  titleBar: Omit<BasicPalette, "selectionBackground" | "selectionForeground">;
  sideBar: BasicPalette;
  explorer: BasicPalette;
  editorGroup: BasicPalette;
  editor: BasicPalette;
  panel: BasicPalette;
  statusBar: BasicPalette;
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
