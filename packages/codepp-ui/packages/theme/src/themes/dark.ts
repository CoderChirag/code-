import { ITheme } from "../types";

const defaultDark: ITheme = {
  name: "default-dark",
  colors: {
    background: "#202020",
    primary: "#2daadc",
    secondary: "#2a2a2a",
    tertiary: "#253f4a",
    borders: "#2f2f2f",
    error: "#ff5f58",
    info: "#795221",
    sidebar: {
      secondary: "#343434",
    },
    editorGroups: {
      secondary: "#2f2f2f",
    },
    panel: {
      tertiary: "#1f3f4a",
    },
    statusBar: {
      background: "#28c840",
    },
  },
  fonts: {
    urls: [
      {
        name: "default",
        url: "https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap",
      },
    ],
    fallback: "sans-serif",
    primary: "Roboto, sans-serif",
    secondary: "Roboto, sans-serif",
    tertiary: "Roboto, sans-serif",
    sidebar: {
      primary: "Roboto, sans-serif",
      secondary: "Roboto, sans-serif",
    },
    editorGroups: {
      primary: "Roboto, sans-serif",
    },
  },
};

export default defaultDark;
