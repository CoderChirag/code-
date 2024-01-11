import { type BasicProps } from "..";

interface MenuIconProps extends BasicProps {}

function MenuIcon({ className, ...props }: MenuIconProps) {
  return (
    <div
      className={`codicon codicon-menu ${className ? className : ""}`}
      {...props}
    ></div>
  );
}

export default MenuIcon;
