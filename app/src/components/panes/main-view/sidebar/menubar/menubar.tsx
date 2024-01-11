import css from "./menubar.module.css";

import { MenuIcon } from "@codepp/ui/icons";

export default function Menubar() {
  return (
    <div id={css.menubar}>
      <MenuIcon />
    </div>
  );
}
