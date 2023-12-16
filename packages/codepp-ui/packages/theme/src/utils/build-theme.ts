import type { ITheme } from "../types";

export function buildTheme(theme: ITheme): ITheme {
  const { colors } = theme;
  const { primary, secondary, background, tertiary } = colors;
  const defaults: Partial<ITheme["colors"]> = {
    activityBar: {
      background: colors?.activityBar?.background || background,
    },
    sidebar: {
      background: colors?.sidebar?.background || background,
      primary: colors?.sidebar?.primary || primary,
      secondary: colors?.sidebar?.secondary || secondary,
    },
    editorGroups: {
      background: colors?.editorGroups?.background || background,
      primary: colors?.editorGroups?.primary || primary,
      secondary: colors?.editorGroups?.secondary || secondary,
    },
    editor: {
      background: colors?.editor?.background || background,
      primary: colors?.editor?.primary || primary,
      secondary: colors?.editor?.secondary || secondary,
      tertiary: colors?.editor?.tertiary || tertiary,
    },
    panel: {
      background: colors?.panel?.background || background,
      primary: colors?.panel?.primary || primary,
      secondary: colors?.panel?.secondary || secondary,
      tertiary: colors?.panel?.tertiary || tertiary,
    },
    statusBar: {
      background: colors?.statusBar?.background || background,
    },
  };

  return {
    ...theme,
    colors: {
      ...colors,
      ...defaults,
    },
  };
}
