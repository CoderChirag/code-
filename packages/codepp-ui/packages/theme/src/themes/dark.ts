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
    background: basicDarkPalette.backgroundSecondary,
    foreground: basicDarkPalette.backgroundSecondary,
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
  sideBar: { ...basicDarkPalette },
  explorer: { ...basicDarkPalette },
  editorGroup: { ...basicDarkPalette },
  editor: { ...basicDarkPalette },
  panel: { ...basicDarkPalette },
  statusBar: { ...basicDarkPalette },
};
