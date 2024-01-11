import css from "./sidebar-footer.module.css";
import { type ActionItem } from "@codepp/hooks";

interface SidebarFooterProps {
  actionItems: ActionItem[];
  activeDragComponent: HTMLElement | null;
  updateActionItems: (actionItems: ActionItem[]) => void;
}

export default function SidebarFooter({
  actionItems,
  activeDragComponent,
  updateActionItems,
}: SidebarFooterProps) {
  function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    e.currentTarget.classList.add(css.top);
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
    e.currentTarget.classList.remove(css.top);
  }

  function dropHandler(e: React.DragEvent<HTMLDivElement>) {
    e.currentTarget.classList.remove(css.top);

    const dragComponentId = activeDragComponent?.id.split("_")[1] || "";
    const dragComponentIndex = actionItems.findIndex(
      (actionItem) => actionItem.id === dragComponentId
    );

    const updatedActionItems = [...actionItems];
    const deletedActionItem = updatedActionItems.splice(
      dragComponentIndex,
      1
    )[0];
    updateActionItems([...updatedActionItems, deletedActionItem]);
  }

  return (
    <div
      id={css["footer-container"]}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
      onDrop={dropHandler}
    ></div>
  );
}
