import { type FC } from "react";
import { FileCopyOutlinedIcon, SearchIcon } from "@codepp/ui/icons";

export interface ActionItem {
  id: string;
  label: string;
  icon: FC;
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
      icon: FileCopyOutlinedIcon,
    },
    {
      id: "search",
      label: "Search",
      icon: SearchIcon,
    },
  ],
};
