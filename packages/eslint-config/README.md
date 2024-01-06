# `@codepp/eslint-config`

**Base eslint config files for the project**

Steps to include in any package inside this monorepo:

- In `devDependencies` in `package.json` specify:
  ```json
  "devDependencies": {
    "@codepp/eslint-config": "*"
  }
  ```
- Run `yarn install`
- In `.eslintrc.js` specify:
  ```js
  /** @type {import("eslint").Linter.Config} */
  module.exports = {
    extends: ["@codepp/eslint-config/<file_ name.js>"],
    // specify any of the files contained in this package.
  };
  ```
