import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"], 
    languageOptions: {
      sourceType: "module",
      globals: {...globals.browser, ...globals.node}
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      "semi": ["error", "always"],
      "indent": ["error", 2],
      "eqeqeq": "warn",
      "no-multi-spaces": "warn",
      "no-duplicate-case": "error",
      "no-extra-semi": "warn",
    }
  },
  pluginJs.configs.recommended,
];