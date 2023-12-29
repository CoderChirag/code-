import css from "./menubar.module.css";

import MenuSharpIcon from "@mui/icons-material/MenuSharp";

export default function Menubar() {
  return (
    <div className={css.menubar}>
      <MenuSharpIcon />
    </div>
  );
}
