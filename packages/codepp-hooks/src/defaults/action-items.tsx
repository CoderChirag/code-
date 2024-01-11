import { type CSSProperties } from "react";
import { type IActionItems } from "..";

export const actionItems: IActionItems = {
  active: "explorer",
  actionItems: [
    {
      id: "explorer",
      label: "Explorer",
      icon: {
        type: "import",
        icon: "ExplorerViewIcon",
      },
      props: { style: { fontSize: "24px" } },
    },
    {
      id: "search",
      label: "Search",
      icon: {
        type: "import",
        icon: "SearchIcon",
      },
      props: {
        style: { fontSize: "24px" },
      },
    },
    {
      id: "source-control",
      label: "Source Control",
      icon: {
        type: "import",
        icon: "SourceControlIcon",
      },
      props: {
        style: { fontSize: "24px" },
      },
    },
    {
      id: "extensions",
      label: "Extensions",
      icon: {
        type: "import",
        icon: "ExtensionsIcon",
      },
      props: {
        style: { fontSize: "24px" },
      },
    },
  ],
};
