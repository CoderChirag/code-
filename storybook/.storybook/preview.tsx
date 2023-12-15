import type { Preview } from "@storybook/react";
import React from "react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    options: {
      storySort: {
        order: ["Configure", "Components", "*"],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "dim",
      values: [
        { name: "dim", value: "#b7b7b7" },
        { name: "bright", value: "#FFFFFF" },
      ],
    },
    darkMode: {
      dark: { appBg: "#1E1E1E" },
      current: "dark",
    },
    decorators: [
      (Story) => {
        return <Story />;
      },
    ],
  },
};

export default preview;
