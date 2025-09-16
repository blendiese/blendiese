import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    ignores: [
      "node_modules",
      ".next/",
      "out",
      "dist",
      "build",
      "next-env.d.ts",
    ],
  },
  tseslint.configs.recommended,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
