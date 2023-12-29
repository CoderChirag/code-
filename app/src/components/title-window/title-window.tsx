import SearchIcon from "@mui/icons-material/Search";
import appCss from "@/components/app/app.module.css";
import css from "./title-window.module.css";

interface TitleWindowProps {
  title: string;
  windowActive: boolean;
}

export default function TitleWindow({ title, windowActive }: TitleWindowProps) {
  return (
    <div className={`${css["title-window"]} ${!windowActive ? css.inactive : ""}`}>
      <SearchIcon className={`${appCss["search-icon"]} ${css["search-icon"]}`} />
      {title}
    </div>
  );
}
