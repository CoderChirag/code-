import type { BasicPalette, ColorPalette } from "../types";

const basicPalette: BasicPalette = {
  background: "#0d1117",
  foreground: "#7d8590",
  border: "#3d4144",
};

export const darkColorPalette: ColorPalette = {
  ...basicPalette,
  resizer: "#1f6feb",
  titleBar: {
    background: "#00040a",
    foreground: basicPalette.foreground,
    titleWindow: {
      background: "#16181c",
      foreground: "#2f333a",
      border: "#1f2329",
      hover: {
        background: "rgba(255, 255, 255, 0.08)",
        foreground: basicPalette.foreground,
        border: "rgba(125, 133, 144, 0.3)",
      },
      inactive: {
        background: "#16181c",
        foreground: basicPalette.foreground,
        border: "rgba(125, 133, 144, 0.25)",
      },
    },
  },
  statusBar: {
    background: basicPalette.background,
    foreground: basicPalette.foreground,
    secondary: {
      background: "#30363d",
      foreground: "#ffffff",
      hover: {
        background: "rgba(230, 237, 243, 0.08)",
        foreground: basicPalette.foreground,
      },
    },
    hover: {
      background: "rgba(230, 237, 243, 0.08)",
      foreground: basicPalette.foreground,
    },
  },
  sideBar: {
    background: basicPalette.background,
    foreground: basicPalette.foreground,
    primary: {
      background: "#1f6feb",
      foreground: "#ffffff",
    },
    secondary: {
      background: "#f78166",
    },
    active: {
      foreground: "#ffffff",
    },
  },
  solutionBar: {
    background: "#010409",
    foreground: "#fff",
    selection: {
      background: "rgba(110, 118, 129, 0.4)",
      foreground: "#1f6feb",
      border: "#1f6feb",
    },
    hover: {
      background: "rgba(110, 118, 129, 0.1)",
    },
  },
  // editorGroup: { ...basicDarkPalette },
  // editor: { ...basicDarkPalette },
  // panel: { ...basicDarkPalette },
  // statusBar: { ...basicDarkPalette },
};
