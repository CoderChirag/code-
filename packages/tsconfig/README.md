# `@codepp/tsconfig`

**Base tsconfig files for the project**

Steps to include in any package inside this monorepo:

- In `devDependencies` in `package.json` specify:
  ```json
  "devDependencies": {
    "@codepp/tsconfig": "*"
  }
  ```
- Run `yarn install`
- In `tsconfig.json` specify:
  ```json
  {
    "extends": "@codepp/tsconfig/<file_name.json>"
    //specify any of the files contained in this package.
  }
  ```
