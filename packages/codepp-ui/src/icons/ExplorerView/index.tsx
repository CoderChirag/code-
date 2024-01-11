import { type BasicProps } from "..";

interface ExplorerViewIconProps extends BasicProps {}

function ExplorerViewIcon({ className, ...props }: ExplorerViewIconProps) {
  return (
    <div
      className={`codicon codicon-explorer-view ${className ? className : ""}`}
      {...props}
    ></div>
  );
}

export default ExplorerViewIcon;
