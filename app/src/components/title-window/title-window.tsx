import css from "./title-window.module.css";
import appCss from "@/components/app/app.module.css";

import { SearchIcon } from "@codepp/ui/icons";

interface TitleWindowProps {
  title: string;
  windowActive: boolean;
}

export default function TitleWindow({ title, windowActive }: TitleWindowProps) {
  return (
    <div
      className={`${css["title-window"]} ${!windowActive ? css.inactive : ""}`}
    >
      <SearchIcon
        className={`${appCss["search-icon"]} ${css["search-icon"]}`}
      />
      {title}
    </div>
  );
}
