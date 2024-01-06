import { styled } from "@mui/material";
import MuiSearchIcon from "@mui/icons-material/Search";

const SearchIcon = styled(MuiSearchIcon)<{ tform?: string }>`
  transform: ${(props) =>
    props.tform
      ? `${props.tform} ${
          props.tform.includes("rotate") ? "" : "rotate(90deg)"
        }`
      : "rotate(90deg)"};
`;

export default SearchIcon;
