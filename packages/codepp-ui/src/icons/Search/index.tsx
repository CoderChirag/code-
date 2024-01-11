import { type BasicProps } from "..";

interface SearchIconProps extends BasicProps {}

function SearchIcon({ className, ...props }: SearchIconProps) {
  return (
    <div
      className={`codicon codicon-search ${className ? className : ""}`}
      {...props}
    ></div>
  );
}

export default SearchIcon;
