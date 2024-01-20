# Overall Architecture for Application Code++ (codepp)

## Introduction

This is a turbo powered monorepo application with all subpackages residing inside `packages/*` and core application is a Nextjs application `@codepp/app` residing inside `app` folder.

## Dependencies

- Although every subpackage is isolated from core application (`@codepp/app`), and removing them will break only some pieces of the complete application and thus all these subpackages are loosely coupled with core app, but `@codepp/hooks` is very tightly coupled with the core app, and removing it would break the entire application.
  For more info about architecture of `@codepp/hooks`, please refer to its ADR [here](./codepp-hooks/architecture.md)
  <br>
- Core app doesn't directly depends on `@codepp/theme` as the theme part is handled by `@codepp/hooks` (read about that inside its [ADR](./codepp-hooks/architecture.md)), and thus **`@codepp/theme` should never be installed as dependency in `@codepp/app` to prevent unwanted issues.**
  <br>
- `@codepp/ui` provides **UI Components** and **Icons**, and thus act as a **Design Language System (DLS)**. All the common ui components should be defined here as pure React Components.
  For more info about `@codepp/ui`, refer to its ADR [here](./codepp-ui/architecture.md)
