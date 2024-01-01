import css from "./sidebar.module.css";

import { useActionItems } from "@codepp/hooks";

import Menubar from "@/components/menubar/menubar";
import Actionbar from "@/components/actionbar/actionbar";

export default function Sidebar() {
  const { actionItems: actionItemsState, setActiveActionItem } =
    useActionItems();
  const { actionItems, active } = actionItemsState;

  return (
    <aside className={css.sidebar}>
      <Menubar />
      <Actionbar
        actionItems={actionItems}
        activeActionItem={active}
        setActiveActionItem={setActiveActionItem}
      />
    </aside>
  );
}
