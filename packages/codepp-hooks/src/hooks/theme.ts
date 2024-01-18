import {
  useTheme as useCodeppTheme,
  type CustomThemeContextType,
} from "@codepp/theme";
import { VirtualAppContext } from "../providers/virtual-app";
import { Context } from "react";

export function useTheme() {
  return useCodeppTheme(
    VirtualAppContext as unknown as Context<CustomThemeContextType>
  );
}
