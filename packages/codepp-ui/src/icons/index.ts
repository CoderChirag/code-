import { default as MuiSearchIcon } from "@mui/icons-material/Search";
import { styled } from "@mui/material";

export { default as MenuSharpIcon } from "@mui/icons-material/MenuSharp";
export { default as FileCopyOutlinedIcon } from "@mui/icons-material/FileCopyOutlined";

export const SearchIcon = styled(MuiSearchIcon)<{ transform?: string }>`
  transform: ${({ transform }) =>
    transform
      ? `${transform} ${!transform.includes("rotate") ? "rotate(90deg)" : ""}`
      : "rotate(90deg)"};
`;
