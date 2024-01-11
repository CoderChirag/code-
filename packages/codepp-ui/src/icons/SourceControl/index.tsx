import { type BasicProps } from "..";

interface SourceControlIconProps extends BasicProps {}

function SourceControlIcon({ className, ...props }: SourceControlIconProps) {
  return (
    <div
      className={`codicon codicon-source-control ${className ? className : ""}`}
      {...props}
    ></div>
  );
}

export default SourceControlIcon;
