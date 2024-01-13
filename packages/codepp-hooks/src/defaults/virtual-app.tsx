import { ThemeBuilder } from "@codepp/theme";
import type { VirtualAppState } from "../types";
import { actionItems as defaultActionItems } from "./action-items";

export const virtualAppState: VirtualAppState = {
  title: "CODE++",
  theme: new ThemeBuilder("dark").getTheme(),
  actionItems: defaultActionItems,
};
