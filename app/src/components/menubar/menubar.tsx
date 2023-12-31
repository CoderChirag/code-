import css from "./menubar.module.css";

import { MenuSharpIcon } from "@codepp/ui/icons";

export default function Menubar() {
  return (
    <div className={css.menubar}>
      <MenuSharpIcon />
    </div>
  );
}
