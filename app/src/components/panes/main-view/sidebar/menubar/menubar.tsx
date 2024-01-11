import css from "./menubar.module.css";

import { MenuIcon } from "@codepp/ui/icons";

export default function Menubar() {
  return (
    <div className={css.menubar}>
      <MenuIcon />
    </div>
  );
}
