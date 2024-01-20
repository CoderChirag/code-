# Architecture for `@codepp/hooks` package

## Introduction

This package provides all the Context Providers, custom hooks, and most importantly the **`withHooks()` higher order component**.

## `withHooks(App: typeof NextApp) : typeof NextApp`

`./src/providers/index.tsx`

- This Higher Order Component tells the Next App to **Server Side Render** the entire application, and synchronizes all the data with server side and provides initial Context values.
  <br>
- This function is basically the **backbone of data sharing between Client Next Application & Server**.

## VirtualApp

- This is a concept that entire application at any point in time should have the capability to be entirely represented as an object (just like React represents DOM as **VirtualDOM**) !! So **VirtualApp** is basically a **root level Application State**.
  <br>
- This would provide the application, a capability to be shared as the exact snapshot of the UI to anyone, at any point in time.
  <br>
- Also by implementing this approach, it is decided that any change in the UI should be Declarative, and just modify the specific part of the Application State (the VirtualApp), and the changes are reflected in UI automatically.
  <br>
- So **VirtualApp** is implemented in the following parts:
  - **VirtualAppContext:** (`./src/providers/virtual-app.tsx`) This is a root level context which will store the root level application state, and the related functions to declaratively change the state.
    <br>
  - **VirtualAppProvider:** (`./src/providers/virtual-app.tsx`) This is the root level Context Provider through which **VirtualAppContext** is injected into the application.
    <br>
  - **Custom Hooks:** (`./src/hooks`) Instead of directly providing **VirtualAppContext** to the application, it is broken into small small hooks, which have accesses to read and update of only the limited parts of the UI, ensuring the **distribution of powers to manage centralized (root level) State.**
    <br>
    - As in the `VirtualAppContext` we directly store the State as a React `useState`, and have a `setState` method to change any part of `VirtualApp`, to limit the accesses, Wrappers over React's `setState` are written.
      <br>
    - For example, the below code exposes a function to provides access to change just the `ActionItems` part of the complete `VirtualAppState`:
      ```tsx
      type SetActionItems = Dispatch<
        SetStateAction<VirtualAppState["actionItems"]>
      >;
      const setActionItems: SetActionItems = (value) => {
        if (typeof value === "function")
          setAppState((prev) => ({
            ...prev,
            actionItems: value(prev.actionItems),
          }));
        else setAppState((prev) => ({ ...prev, actionItems: value }));
      };
      ```

## Custom Hooks

- As most of the **Custom Hooks**, would be for declaratively changing the small parts of **VirtualAppState** (as discussed above), most of these would be following the below design pattern:

  ```tsx
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
        actionItems.filter((item) => defaultItemIds.includes(item.id))
          .length !== defaultItemIds.length
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
    const { actionItems, setActionItems } = useContext(VirtualAppContext);
    return new ActionItems([actionItems, setActionItems]);
  }
  ```

## Theme

- As we are considering that **Theme** is also the part of `VirtualAppState`, thus we can't directly use **Providers** and **Contexts** provided by `@codepp/theme`.
  <br>
- Thus we are just importing **default themes** from the `@codepp/package`, using them as initial values to our **VirtualAppContext**.
  <br>
- For accessing and updating theme declaratively in the application, we are following the same approach as discussed above (providing custom hook with limited accesses), but here the custom hook `useTheme()` using the **Wrapper** of React's `setState()` is again a **Wrapper** to `useTheme()` provided by `@codepp/theme` (basically passing our own context to `codepp/theme`'s `useTheme()`)

  - The `setTheme()` function (wrapper on `setState()`) is given as:

    ```tsx
    type SetTheme = Dispatch<SetStateAction<VirtualAppState["theme"]>>;
    const setTheme: SetTheme = (value) => {
      if (typeof value === "function")
        setAppState((prev) => ({ ...prev, theme: value(prev.theme) }));
      else setAppState((prev) => ({ ...prev, theme: value }));
    };
    ```

  - The `useTheme()` **Wrapper** to `@codepp/theme`'s `useTheme()` is given as:

    ```tsx
    import {
      useTheme as useCodeppTheme,
      type CustomThemeContextType,
    } from "@codepp/theme";
    import { VirtualAppContext } from "../providers/virtual-app";
    import { Context } from "react";

    export function useTheme() {
      return useCodeppTheme(
        VirtualAppContext as unknown as Context<CustomThemeContextType>
      );
    }
    ```

    <br>

- Also, to make the core application (`@codepp/app`) completely independent of `@codepp/theme`, the utility functions from `@codepp/theme` such as: `buildCSSVars()`, `buildFontImports()` etc, are directly imported from inside `@codepp/hooks/utils`
