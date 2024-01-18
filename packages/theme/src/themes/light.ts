import type { ColorPalette } from "../types";

const background1 = "#0d1117",
  background2 = "#010409";
const foreground1 = "#7d8590",
  foreground2 = "#fff";
const border = "#3d4144";

export const lightColorPalette: ColorPalette = {
  background: background1,
  foreground: foreground1,
  border,
  resizer: "#1f6feb",
  titleBar: {
    background: background2,
    foreground: foreground1,
    titleWindow: {
      background: "#16181c",
      foreground: "#2f333a",
      border: "#1f2329",
      hover: {
        background: "rgba(255, 255, 255, 0.08)",
        foreground: foreground1,
        border: "rgba(125, 133, 144, 0.3)",
      },
      inactive: {
        background: "#16181c",
        foreground: foreground1,
        border: "rgba(125, 133, 144, 0.25)",
      },
    },
  },
  statusBar: {
    background: background1,
    foreground: foreground1,
    secondary: {
      background: "#30363d",
      foreground: foreground2,
      hover: {
        background: "rgba(230, 237, 243, 0.08)",
        foreground: foreground1,
      },
    },
    hover: {
      background: "rgba(230, 237, 243, 0.08)",
      foreground: foreground1,
    },
  },
  sideBar: {
    background: background1,
    foreground: foreground1,
    primary: {
      background: "#1f6feb",
      foreground: foreground2,
    },
    secondary: {
      background: "#f78166",
    },
    active: {
      foreground: foreground2,
    },
  },
  solutionBar: {
    background: background2,
    foreground: foreground2,
    selection: {
      background: "rgba(110, 118, 129, 0.4)",
      foreground: "#1f6feb",
      border: "#1f6feb",
    },
    hover: {
      background: "rgba(110, 118, 129, 0.1)",
    },
  },
  editorGroup: {
    background: "#010409",
    foreground: foreground1,
    primary: {
      background: "#1f6feb",
      foreground: foreground2,
    },
    secondary: {
      background: "#f78166",
    },
    active: {
      foreground: foreground2,
    },
  },
  editor: {
    background: background1,
    foreground: foreground2,
    active: {
      background: "rgba(110, 118, 129, 0.1)",
    },
    selection: {
      background: "#1a3048",
    },
    cursorColor: "#2f81f7",
    lineNumber: {
      foreground: foreground1,
      active: {
        foreground: foreground2,
      },
    },
  },
  // panel: { ...basicDarkPalette },
  // statusBar: { ...basicDarkPalette },
};
