# Architecture of `@codepp/ui` package

## Introduction

This package provides **UI Components** and **Icons**, and thus act as a **Design Language System (DLS)**. All the common ui components should be defined here as pure React Components.

## Using Icons

The **Icons Module** is basically a wrapper on top of various Icon Libraries, like `@vscode/codicons` and `@mui/icons-material`, to provide a centralized repository for Icons for the complete application, and for maintaining consistencies in any customizations over any of these Icons Libraries.

Every Icon to be used inside the **Core Application** must be defined or exported from here, and strictly imported only from this repo.

### Dependencies

- To use the icons provided by this package, you need to have installed `@vscode/codicons` package.
  <br>
- Also, you would have to import 2 root level (global level) CSS files, in order to use the **Icons Module:**
  - `import '@vscode/codicons/dist/codicon.css'`
    <br>
  - `import '@codepp/ui/css`

### Usage

- The **Codepp-ui Icons** package provides both **named** and **default exports** for each icon.
  <br>
- The **default exports** are provided to support dynamic import of the Icon at runtime.
  <br>
- Below are the both ways of importing:
  ```tsx
  import { SearchIcon } from "@codepp/ui/icons";
  import SearchIcon from "@codepp/ui/icons/Search";
  ```
