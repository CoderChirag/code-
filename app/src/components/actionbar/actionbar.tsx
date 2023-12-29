import css from "./actionbar.module.css";

interface ActionBarProps {
  actionItems: {
    id: string;
    label: string;
    icon: JSX.Element;
    action: () => void;
  }[];
  activeActionItem: string;
}

export default function Actionbar({
  actionItems,
  activeActionItem,
}: ActionBarProps) {
  return (
    <ul className={css.actionbar}>
      {actionItems.map((actionItem) => (
        <li
          className={`${css["action-item"]} ${
            actionItem.id === activeActionItem ? css.active : ""
          }`}
          key={actionItem.id}
          id={css[actionItem.id]}
          onClick={actionItem.action}
          draggable={true}
        >
          {actionItem.icon}
          <div className={css["active-item-indicator"]}></div>
        </li>
      ))}
    </ul>
  );
}
