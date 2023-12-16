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

export interface ColorPalette {
  background: Color;
  primary: Color;
  secondary: Color;
  tertiary: Color;
  borders: Color;
  info: Color;
  error: Color;
  activityBar?: {
    background?: Color;
  };
  sidebar?: {
    background?: Color;
    primary?: Color;
    secondary?: Color;
  };
  editorGroups?: {
    background?: Color;
    primary?: Color;
    secondary?: Color;
  };
  editor?: {
    background?: Color;
    primary?: Color;
    secondary?: Color;
    tertiary?: Color;
  };
  panel?: {
    background?: Color;
    primary?: Color;
    secondary?: Color;
    tertiary?: Color;
  };
  statusBar?: {
    background?: Color;
  };
}

export interface Fonts {
  urls?: [
    {
      name: string;
      url: string;
    }
  ];
  fallback: "serif" | "sans-serif" | "monospace" | "cursive";
  primary: string;
  secondary: string;
  tertiary: string;
  sidebar?: {
    primary: string;
    secondary: string;
  };
  editorGroups?: {
    primary: string;
  };
}

export interface ITheme {
  name: string;
  colors: ColorPalette;
  fonts: Fonts;
}
