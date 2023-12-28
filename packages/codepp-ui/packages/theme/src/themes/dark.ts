import type { BasicPalette, ColorPalette } from "../types";

export const basicDarkPalette: BasicPalette = {
  backgroundPrimary: "#1f6feb",
  backgroundSecondary: "#00040a",
  foregroundPrimary: "#fff",
  foregroundSecondary: "#fff",
  selectionBackground: "#1a3048",
  selectionForeground: "#fff",
  hoverBackground: "#00040a",
  hoverForeground: "#fff",
};

export const darkColorPalette: ColorPalette = {
  ...basicDarkPalette,
  borderColor: "#3d4144",
  titleBar: {
    backgroundPrimary: basicDarkPalette.backgroundPrimary,
    backgroundSecondary: basicDarkPalette.backgroundSecondary,
    foregroundPrimary: basicDarkPalette.foregroundPrimary,
    foregroundSecondary: basicDarkPalette.foregroundSecondary,
    hoverBackground: basicDarkPalette.hoverBackground,
    hoverForeground: basicDarkPalette.hoverForeground,
  },
  sideBar: { ...basicDarkPalette },
  explorer: { ...basicDarkPalette },
  editorGroup: { ...basicDarkPalette },
  editor: { ...basicDarkPalette },
  panel: { ...basicDarkPalette },
  statusBar: { ...basicDarkPalette },
};
