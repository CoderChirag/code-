import { CSSProperties, type Dispatch, type SetStateAction } from "react";

export type CSSVar = `--${string}`;

export interface ThemeContextType {
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
  editorGroup: Omit<BasicPalette, "border"> & {
    primary: Omit<BasicPalette, "border">;
    secondary: {
      background: Color;
    };
    active: {
      foreground: Color;
    };
  };
  editor: Omit<BasicPalette, "border"> & {
    active: {
      background: Color;
    };
    selection: {
      background: Color;
    };
    cursorColor: Color;
    lineNumber: {
      foreground: Color;
      active: {
        foreground: Color;
      };
    };
  };
  // panel: BasicPalette;
}

export interface Fonts {
  urls: {
    name: string;
    url: string;
  }[];
  primary: CSSProperties["fontFamily"];
  editor: {
    font: CSSProperties["fontFamily"];
    size: `${number}px`;
    lineHeight: `${number}px`;
  };
}

export interface ITheme {
  name: string;
  colors: ColorPalette;
  fonts: Fonts;
}
