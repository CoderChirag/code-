import { ITheme } from "@codepp/theme";
import { type CSSProperties } from "react";

export interface ActionItem {
  id: string;
  label: string;
  icon: {
    type: "import" | "parse";
    icon: string;
  };
  props: {
    [key: string]: unknown;
    style?: CSSProperties;
  };
}

export interface IActionItems {
  active: string;
  actionItems: ActionItem[];
}

export interface VirtualAppState {
  title: string;
  theme: ITheme;
  actionItems: IActionItems;
}
