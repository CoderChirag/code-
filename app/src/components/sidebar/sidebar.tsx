import css from "./sidebar.module.css";

import { useState } from "react";
import { FileCopyOutlinedIcon, SearchIcon } from "@codepp/ui/icons";

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
      icon: <SearchIcon tform="scale(1.2) rotate(85deg)" />,
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
