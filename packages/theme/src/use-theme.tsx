import {
  type Context,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";
import {
  type Fonts,
  type ColorPalette,
  type ITheme,
  type ThemeContextType,
} from ".";
import { ThemeContext } from "./provider";

export interface CustomThemeContextType extends ThemeContextType {
  [key: string]: any;
}

class Theme {
  #theme: ITheme;
  #setTheme: Dispatch<SetStateAction<ITheme>>;
  constructor(theme: ITheme, setTheme: Dispatch<SetStateAction<ITheme>>) {
    this.#theme = theme;
    this.#setTheme = setTheme;
  }
  get name(): string {
    return this.#theme.name;
  }
  get colors(): ColorPalette {
    return this.#theme.colors;
  }
  get fonts(): ITheme["fonts"] {
    return this.#theme.fonts;
  }

  setEditorFontSize(value: number) {
    this.#setTheme((prev) => ({
      ...prev,
      fonts: {
        ...prev.fonts,
        editor: {
          ...prev.fonts.editor,
          size: `${value}px`,
          lineHeight: `${value + 4}px`,
        },
      },
    }));
  }
}

export const useTheme = (context?: Context<CustomThemeContextType>) => {
  if (context) {
    const { theme, setTheme } = useContext(context);
    return new Theme(theme, setTheme);
  }

  const { theme, setTheme } = useContext(ThemeContext);
  return new Theme(theme, setTheme);
};
