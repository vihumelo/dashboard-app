import { defineConfig, globalIgnores } from "eslint/config";
import nextPlugin from "@next/eslint-plugin-next";
import typescriptEslint from "typescript-eslint";

export default defineConfig([
  nextPlugin.configs["core-web-vitals"],
  ...typescriptEslint.configs.recommended,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "next-env.d.ts",
  ]),
]);
