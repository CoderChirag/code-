import css from "./actionbar.module.css";

import { type ComponentType, useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import parse from "html-react-parser";
import { type ActionItem } from "@codepp/hooks";

interface ActionBarProps {
  actionItems: ActionItem[];
  activeActionItem: string;
  setActiveActionItem: (id: string) => void;
}

type Icon = ComponentType;

export default function Actionbar({
  actionItems,
  activeActionItem,
  setActiveActionItem,
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

  return (
    <ul className={css.actionbar}>
      {actionItems.map((actionItem) => {
        const Icon = iconComponents[actionItem.id].imported;
        const parsedIcon = iconComponents[actionItem.id].parsed;
        return (
          <li
            className={`${css["action-item"]} ${
              actionItem.id === activeActionItem ? css.active : ""
            }`}
            key={actionItem.id}
            id={css[actionItem.id]}
            onClick={actionHandler.bind(null, actionItem.id)}
            draggable={true}
          >
            {Icon ? <Icon {...actionItem.props} /> : parsedIcon}
            <div className={css["active-item-indicator"]}></div>
          </li>
        );
      })}
    </ul>
  );
}
