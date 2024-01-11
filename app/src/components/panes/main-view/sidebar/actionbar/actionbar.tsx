import css from "./actionbar.module.css";

import {
  type ComponentType,
  type Dispatch,
  type SetStateAction,
  useMemo,
} from "react";
import parse from "html-react-parser";
import { type ActionItem } from "@codepp/hooks";

interface ActionBarProps {
  actionItems: ActionItem[];
  activeActionItem: string;
  setActiveActionItem: (id: string) => void;
  updateActionItems: (actionItems: ActionItem[]) => void;
  activeDragComponent: HTMLElement | null;
  setActiveDragComponent: Dispatch<SetStateAction<HTMLElement | null>>;
  activeDragOverComponent: HTMLElement | null;
  setActiveDragOverComponent: Dispatch<SetStateAction<HTMLElement | null>>;
}

type Icon = ComponentType<ActionItem["props"]>;

export default function Actionbar({
  actionItems,
  activeActionItem,
  setActiveActionItem,
  updateActionItems,
  activeDragComponent,
  setActiveDragComponent,
  activeDragOverComponent,
  setActiveDragOverComponent,
}: ActionBarProps) {
  const iconComponents = useMemo(() => {
    const icons: Record<
      string,
      { imported?: Icon; parsed?: ReturnType<typeof parse> }
    > = {};
    actionItems.forEach((actionItem) => {
      if (actionItem.icon.type === "parse")
        icons[actionItem.id] = { parsed: parse(actionItem.icon.icon) };
      else {
        const Icon = require("@codepp/ui/icons");
        icons[actionItem.id] = { imported: Icon[actionItem.icon.icon] };
      }
    });
    return icons;
  }, [actionItems]);

  function actionHandler(id: string) {
    setActiveActionItem(id);
  }

  function dragStartHandler(e: React.DragEvent<HTMLLIElement>) {
    setActiveDragComponent(e.currentTarget);
  }

  function dragOverHandler(e: React.DragEvent<HTMLLIElement>) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    setActiveDragOverComponent(e.currentTarget);

    if (e.currentTarget === activeDragComponent) return;
    e.currentTarget.classList.add(css["top"]);
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLLIElement>) {
    setActiveDragOverComponent(null);
    e.currentTarget.classList.remove(css["top"]);
  }

  function findDragIds(e: React.DragEvent<HTMLLIElement>) {
    const dragComponentId = activeDragComponent?.id.split("_")[1] || "";
    const dragOverComponentId = activeDragOverComponent?.id.split("_")[1] || "";

    return [dragComponentId, dragOverComponentId];
  }

  function moveActionItems(
    dragComponentId: string,
    dragOverComponentId: string
  ) {
    const dragComponentIndex = actionItems.findIndex(
      (actionItem) => actionItem.id === dragComponentId
    );
    const dragOverComponentIndex = actionItems.findIndex(
      (actionItem) => actionItem.id === dragOverComponentId
    );
    const updatedActionItems = [...actionItems];

    updatedActionItems.splice(
      dragOverComponentIndex > dragComponentIndex
        ? dragOverComponentIndex - 1
        : dragOverComponentIndex, // if dragOverComponent is below dragComponent, then dragOverComponentIndex - 1
      0,
      updatedActionItems.splice(dragComponentIndex, 1)[0]
    );

    return updatedActionItems;
  }

  function dropHandler(e: React.DragEvent<HTMLLIElement>) {
    e.currentTarget.classList.remove(css["top"]);

    const [dragComponentId, dragOverComponentId] = findDragIds(e);

    const updatedActionItems = moveActionItems(
      dragComponentId,
      dragOverComponentId
    );
    updateActionItems(updatedActionItems);

    setActiveDragComponent(null);
    setActiveDragOverComponent(null);
  }

  return (
    <ul id={css.actionbar}>
      {actionItems.map((actionItem) => {
        const Icon = iconComponents[actionItem.id].imported;
        const parsedIcon = iconComponents[actionItem.id].parsed;
        return (
          <li
            className={`${css["action-item"]} ${
              actionItem.id === activeActionItem ? css.active : ""
            } ${css[actionItem.id] ? css[actionItem.id] : ""}`}
            key={actionItem.id}
            id={`actionbar_${actionItem.id}`}
            onClick={actionHandler.bind(null, actionItem.id)}
            draggable={true}
            onDragStart={dragStartHandler}
            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
            onDrop={dropHandler}
          >
            {Icon ? <Icon {...actionItem.props} /> : parsedIcon}
            <div className={css["active-item-indicator"]}></div>
          </li>
        );
      })}
    </ul>
  );
}
