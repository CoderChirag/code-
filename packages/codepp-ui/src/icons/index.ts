import { type CSSProperties } from "react";

export interface BasicProps {
  className?: string;
  id?: string;
  style?: CSSProperties;
}

export { default as SearchIcon } from "./Search";
export { default as MenuIcon } from "./Menu";
export { default as ExplorerViewIcon } from "./ExplorerView";
export { default as SourceControlIcon } from "./SourceControl";
export { default as ExtensionsIcon } from "./Extensions";
