import SearchIcon from "@mui/icons-material/Search";

export interface ActionItem {
  id: string;
  label: string;
  icon: {
    type: "import" | "parse";
    icon: string;
  };
  props: Record<string, any>;
}

export interface IActionItems {
  active: string;
  actionItems: ActionItem[];
}

export const actionItems: IActionItems = {
  active: "explorer",
  actionItems: [
    {
      id: "explorer",
      label: "Explorer",
      icon: {
        type: "import",
        icon: "FileCopyOutlinedIcon",
      },
      props: {},
    },
    {
      id: "search",
      label: "Search",
      icon: {
        type: "import",
        icon: "SearchIcon",
      },
      props: {
        tform: "scale(1.5) rotate(85deg)",
      },
    },
  ],
};
