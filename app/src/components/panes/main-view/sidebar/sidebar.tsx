import css from "./sidebar.module.css";

import { useState } from "react";
import { useActionItems } from "@codepp/hooks";

import Menubar from "@/components/panes/main-view/sidebar/menubar/menubar";
import Actionbar from "@/components/panes/main-view/sidebar/actionbar/actionbar";
import SidebarFooter from "./sidebar-footer/sidebar-footer";

export default function Sidebar() {
  const [activeDragComponent, setActiveDragComponent] =
    useState<HTMLElement | null>(null);
  const [activeDragOverComponent, setActiveDragOverComponent] =
    useState<HTMLElement | null>(null);

  const {
    actionItems: actionItemsState,
    setActiveActionItem,
    updateActionItems,
  } = useActionItems();
  const { actionItems, active } = actionItemsState;

  return (
    <aside className={css.sidebar}>
      <Menubar />
      <Actionbar
        actionItems={actionItems}
        activeActionItem={active}
        setActiveActionItem={setActiveActionItem}
        updateActionItems={updateActionItems}
        activeDragComponent={activeDragComponent}
        setActiveDragComponent={setActiveDragComponent}
        activeDragOverComponent={activeDragOverComponent}
        setActiveDragOverComponent={setActiveDragOverComponent}
      />
      <SidebarFooter
        actionItems={actionItems}
        activeDragComponent={activeDragComponent}
        updateActionItems={updateActionItems}
      />
    </aside>
  );
}
