import type { BasicPalette, ColorPalette } from "../types";

export const basicLightPalette: BasicPalette = {
  backgroundPrimary: "#2daadc",
  backgroundSecondary: "#202020",
  foregroundPrimary: "#fff",
  foregroundSecondary: "#fff",
  selectionBackground: "#253f4a",
  selectionForeground: "#fff",
  hoverBackground: "#2a2a2a",
  hoverForeground: "#fff",
};

export const lightColorPalette: ColorPalette = {
  ...basicLightPalette,
  borderColor: "#2daadc",
  titleBar: {
    backgroundPrimary: basicLightPalette.backgroundPrimary,
    backgroundSecondary: basicLightPalette.backgroundSecondary,
    foregroundPrimary: basicLightPalette.foregroundPrimary,
    foregroundSecondary: basicLightPalette.foregroundSecondary,
    hoverBackground: basicLightPalette.hoverBackground,
    hoverForeground: basicLightPalette.hoverForeground,
  },
  sideBar: { ...basicLightPalette },
  explorer: { ...basicLightPalette },
  editorGroup: { ...basicLightPalette },
  editor: { ...basicLightPalette },
  panel: { ...basicLightPalette },
  statusBar: { ...basicLightPalette },
};
