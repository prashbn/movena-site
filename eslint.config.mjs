import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores([
    ".next/**",
    "node_modules/**",
    "public/**",
    "assets/**",
    "tools/**",
    "**/index.html",
    "next-env.d.ts",
  ]),
  {
    files: ["app/layout.tsx"],
    rules: {
      // App Router's root layout is the site-wide document. Keeping the current
      // Google Fonts request preserves the frozen privacy copy in Slice 1.
      "@next/next/no-page-custom-font": "off",
    },
  },
]);
