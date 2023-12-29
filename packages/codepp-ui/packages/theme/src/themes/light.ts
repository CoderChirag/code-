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
    background: basicLightPalette.backgroundSecondary,
    foreground: basicLightPalette.backgroundSecondary,
    titleWindow: {
      background: "#16181c",
      foreground: "#2f333a",
      border: "#1f2329",
      hover: {
        background: "rgba(255, 255, 255, 0.08)",
        foreground: "#7d8590",
        border: "rgba(125, 133, 144, 0.3)",
      },
      inactive: {
        background: "#16181c",
        foreground: "#7d8590",
        border: "rgba(125, 133, 144, 0.25)",
      },
    },
  },
  sideBar: { ...basicLightPalette },
  explorer: { ...basicLightPalette },
  editorGroup: { ...basicLightPalette },
  editor: { ...basicLightPalette },
  panel: { ...basicLightPalette },
  statusBar: { ...basicLightPalette },
};
