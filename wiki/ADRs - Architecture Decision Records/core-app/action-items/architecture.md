# Action Items

## Introduction

- All the Icons present inside the upper part of leftmost sidebar, are termed as **Action Items**, and this upper bar is termed as **Action Bar**.
  <br>
- All the **Action Items** are draggable, and can be moved up and down to interchange there positions.
  <br>
- The **Action Items** are provided by the `useActionItems()` hook, which accesses the `actionItems` property of **VirtualAppState**.

## Schema

```tsx
interface ActionItem {
  id: string;
  label: string;
  icon: {
    type: "import" | "parse";
    icon: string;
  };
  props: {
    [key: string]: unknown;
    style?: CSSProperties;
  };
}

interface IActionItems {
  active: string;
  actionItems: ActionItem[];
}
```

- The `icon.type` key can have possibly 2 values: `"import"` or `"parse"`, based upon which, the type of **Icon** is decided on runtime:
  - `"import"`: If the `icon.type` value is `"import"`, then the `icon.icon` value must be the name of the Icon present inside `@codepp/ui/icons`, and that **Icon**, would be imported on runtime and showed here.
    For Eg, if `icon` is given as:
    ```tsx
    icon: {
      type: "import",
      icon: "SearchIcon"
    }
    ```
    On runtime, this would be similar to:
    ```tsx
    import SearchIcon from "@codepp/ui/icons/Search";
    ```
    <br>
  - `"parse"`: If the `icon.type` value is `"parse"`, then `icon.icon` must be a valid **html string**, which would be parsed to HTML at runtime.
    <br>
- All the keys and values provided in `props`, would be provided as props, to the dynamically built Icon.

## Drag and Drop Functionality Architecture

### Objective of the Functionality

This functionality is supposed, to interchange the order according to where the user drags and places the action item within the **Action Bar**.

### Implementation Overview

- Firstly, every action item has `draggable=true`, attribute in its html, so that the item can become draggable on DOM.
  <br>
- Following 2 states are maintained:
  - `activeDragComponent`: The **Action Item**, that is being dragged.
    <br>
  - `activeDragOverComponent`: The **Action Items**, over which the `activeDragComponent` is being dragged over.
    <br>
- Every action item listens to the following events:

  - `dragStart`: This event just sets the current target component as the `activeDragComponent`. This is basically the **Action Item** which is being moved / dragged.
    <br>
  - `dragOver`: This is basically the **Action Item** over which another **Action Item** is being dragged. This event does the following:
    - Triggers `event.preventDefault()`, so that it would capture the `drop` event, and sets `e.dataTransfer.dropEffect` to `"move"`, so that the `+` icon doesn't appear in drag animation of DOM.
      <br>
    - Sets the current target component as the `activeDragOverComponent`.
      <br>
    - Also handles the case, if the currently being dragged item (`activeDragComponent`) is same as the current target component, meaning that the component is being dragged over to itself it just returns, else it inserts the `.top` class in the current target so that a line above this appears, which depicts the user that if he drops the being dragged item at this point, it would be shifted above this item.
      <br>
  - `dragLeave`: This event basically means that the element being dragged is no longer over the current target, and thus it sets `activeDragOverComponent` to `null` (if the element is being dragged over any other item, this state would automatically be set to that element due to that element's `dragOver` event), and removes the `.top` class so that the line above it disappears.
    <br>
  - `drop`: This event depicts that the user has dropped the currently being dragged item, and thus order have to be changed accordingly. It does the following:

    - Removes the `.top` class.
      <br>
    - Finds the `id`s of `activeDragComponent`, and `activeDragOverComponent`.
      <br>
    - Shifts the position of both the **Action Items**, in the **actionItems** array of **VirtualAppState**, with the help of `useActionItems()` hook.

      ```tsx
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
      ```

      <br>

    - Finally sets the `activeDragComponent` and `activeDragOverComponent` to null

    <br>

- One more thing to consider is that, when the `activeDragComponent` is dragged to the bottom of the **Action Bar**, it should place the element at the bottom, shifting all elements above, but as in this case no `dragOver` event is being triggered, we have to listen to `dragOver` event of **Sidebar Footer** (the area below **Action Bar** inside **Side Bar**), to implement this.
