import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  FC,
  PropsWithChildren,
  useState,
} from "react";
import { type ActionItem, type IActionItems } from "../defaults/action-items";

type SetActionItems = Dispatch<SetStateAction<IActionItems>>;

const ActionItemsContext = createContext<[IActionItems, SetActionItems]>([
  { active: "", actionItems: [] },
  () => undefined,
]);

interface IProviderProps {
  actionItems: IActionItems;
}

export const ActionItemsProvider: FC<PropsWithChildren<IProviderProps>> = ({
  children,
  actionItems,
}) => {
  const [actionItemsState, setActionItemsState] =
    useState<IActionItems>(actionItems);
  return (
    <ActionItemsContext.Provider
      value={[actionItemsState, setActionItemsState]}
    >
      {children}
    </ActionItemsContext.Provider>
  );
};

class ActionItems {
  #actionItems: IActionItems;
  #setActionItems: SetActionItems;
  constructor([actionItems, setActionItems]: [IActionItems, SetActionItems]) {
    this.#actionItems = actionItems;
    this.#setActionItems = setActionItems;
  }
  get actionItems() {
    return this.#actionItems;
  }
  addActionItem(actionItem: ActionItem) {
    if (
      !this.#actionItems.actionItems.find((item) => item.id === actionItem.id)
    )
      this.#setActionItems((prev) => ({
        active: prev.active,
        actionItems: [...prev.actionItems, actionItem],
      }));
    else {
      throw new Error(`Action Item with id ${actionItem.id} already exists`);
    }
  }
  removeActionItem(id: string) {
    this.#setActionItems((prev) => ({
      active: prev.active === id ? "explorer" : prev.active,
      actionItems: prev.actionItems.filter((item) => item.id !== id),
    }));
  }
}

let actionItemsInstance: ActionItems;

export function useActionItems() {
  const [actionItems, setActionItems] = useContext(ActionItemsContext);
  if (!actionItemsInstance)
    actionItemsInstance = new ActionItems([actionItems, setActionItems]);
  return actionItemsInstance;
}
