import appCss from "@/components/app/app.module.css";
import css from "./sidebar.module.css";
import { useState } from "react";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import SearchIcon from "@mui/icons-material/Search";

import Menubar from "@/components/menubar/menubar";
import Actionbar from "@/components/actionbar/actionbar";

export default function Sidebar() {
  const [activeActionItem, setActiveActionItem] = useState("explorer");

  const actionItems = [
    {
      id: "explorer",
      label: "Explorer",
      icon: <FileCopyOutlinedIcon />,
      action: () => {
        setActiveActionItem("explorer");
      },
    },
    {
      id: "search",
      label: "Search",
      icon: <SearchIcon className={`${css["search-icon"]}}`} />,
      action: () => {
        setActiveActionItem("search");
      },
    },
  ];

  return (
    <aside className={css.sidebar}>
      <Menubar />
      <Actionbar
        actionItems={actionItems}
        activeActionItem={activeActionItem}
      />
    </aside>
  );
}
