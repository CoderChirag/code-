import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  FC,
  PropsWithChildren,
  useState,
} from "react";
import { actionItems as defaultActionItems } from "../defaults/action-items";
import { type ActionItem, type IActionItems } from "..";

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
  const [actionItemsState, setActionItemsState] = useState<IActionItems>({
    active: actionItems.active,
    actionItems: actionItems.actionItems.map((item) => ({
      ...item,
      icon: item.icon,
    })),
  });
  return (
    <ActionItemsContext.Provider
      value={[actionItemsState, setActionItemsState]}
    >
      {children}
    </ActionItemsContext.Provider>
  );
};

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
  const context = useContext(ActionItemsContext);
  return new ActionItems(context);
}
