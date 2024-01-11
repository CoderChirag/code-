import { type BasicProps } from "..";

interface ExtensionsIconProps extends BasicProps {}

function ExtensionsIcon({ className, ...props }: ExtensionsIconProps) {
  return (
    <div
      className={`codicon codicon-extensions ${className ? className : ""}`}
      {...props}
    ></div>
  );
}

export default ExtensionsIcon;
