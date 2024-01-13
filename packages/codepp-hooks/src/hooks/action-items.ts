import { useContext } from "react";
import { actionItems as defaultActionItems } from "../defaults/action-items";
import { type ActionItem, type IActionItems } from "..";
import {
  type SetActionItems,
  VirtualAppContext,
} from "../providers/virtual-app";

class ActionItems {
  #state: IActionItems;
  #setState: SetActionItems;

  constructor([actionItems, setActionItems]: [IActionItems, SetActionItems]) {
    this.#state = actionItems;
    this.#setState = setActionItems;
  }

  get actionItems() {
    return this.#state;
  }

  addActionItem = (actionItem: ActionItem) => {
    if (!this.#state.actionItems.find((item) => item.id === actionItem.id))
      this.#setState((prev) => ({
        active: prev.active,
        actionItems: [...prev.actionItems, actionItem],
      }));
    else {
      throw new Error(`Action Item with id ${actionItem.id} already exists`);
    }
  };

  removeActionItem = (id: string) => {
    this.#setState((prev) => ({
      active: prev.active === id ? "explorer" : prev.active,
      actionItems: prev.actionItems.filter((item) => item.id !== id),
    }));
  };

  updateActionItems = (actionItems: ActionItem[]) => {
    const defaultItemIds = defaultActionItems.actionItems.map(
      (item) => item.id
    );
    if (
      actionItems.filter((item) => defaultItemIds.includes(item.id)).length !==
      defaultItemIds.length
    )
      return;

    this.#setState((prev) => ({
      active: prev.active,
      actionItems: actionItems,
    }));
  };

  setActiveActionItem = (id: string) => {
    if (this.#state.actionItems.find((item) => item.id === id))
      this.#setState((prev) => ({
        ...prev,
        active: id,
      }));
  };
}

export function useActionItems() {
  const { virtualAppState, setActionItems } = useContext(VirtualAppContext);
  return new ActionItems([virtualAppState.actionItems, setActionItems]);
}
