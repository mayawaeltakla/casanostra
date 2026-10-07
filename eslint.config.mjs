import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import i18next from "eslint-plugin-i18next";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const literalLabelAttribute = {
  meta: {
    type: "suggestion",
    schema: [],
    messages: {
      useTranslation: "Avoid literal text in the label attribute; use a localized value.",
    },
  },
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.name !== "label" || node.value?.type !== "Literal") return;
        if (typeof node.value.value !== "string" || !node.value.value.trim()) return;
        if (/^[A-Z0-9_-]+$/.test(node.value.value.trim())) return;
        context.report({ node: node.value, messageId: "useTranslation" });
      },
    };
  },
};

const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, {
  rules: {
    // TypeScript rules
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/prefer-as-const": "off",
    "@typescript-eslint/no-unused-disable-directive": "off",
    
    // React rules
    "react-hooks/exhaustive-deps": "off",
    "react-hooks/purity": "off",
    "react/no-unescaped-entities": "off",
    "react/display-name": "off",
    "react/prop-types": "off",
    "react-compiler/react-compiler": "off",
    
    // Next.js rules
    "@next/next/no-img-element": "off",
    "@next/next/no-html-link-for-pages": "off",
    
    // General JavaScript rules
    "prefer-const": "off",
    "no-unused-vars": "off",
    "no-console": "off",
    "no-debugger": "off",
    "no-empty": "off",
    "no-irregular-whitespace": "off",
    "no-case-declarations": "off",
    "no-fallthrough": "off",
    "no-mixed-spaces-and-tabs": "off",
    "no-redeclare": "off",
    "no-undef": "off",
    "no-unreachable": "off",
    "no-useless-escape": "off",
  },
}, {
  files: ["src/**/*.tsx", "src/**/*.jsx"],
  plugins: {
    i18next,
    localI18n: { rules: { "literal-label-attribute": literalLabelAttribute } },
  },
  rules: {
    "i18next/no-literal-string": ["warn", {
      mode: "jsx-only",
      "jsx-attributes": {
        include: [],
        exclude: [
          "className",
          "styleName",
          "style",
          "type",
          "key",
          "id",
          "width",
          "height",
          "data-slot",
          "data-sidebar",
          "data-mobile",
          /^data-/,
          "aria-hidden",
          "aria-expanded",
          "aria-haspopup",
          "aria-selected",
          "aria-controls",
          "aria-current",
          "role",
          "variant",
          "size",
          "side",
          "align",
          "asChild",
          "disabled",
          "checked",
          "name",
          "href",
          "src",
          "fill",
          "priority",
          "sizes",
          "target",
          "rel",
          "method",
          "autoComplete",
          "dir",
          "lang",
          "tabIndex",
          "loading",
          "decoding",
          "media",
          "download",
        ],
      },
      callees: {
        include: [],
        exclude: [
          "t",
          "t[A-Z].*",
          "lt",
          "require",
          "i18n(ext)?",
          "addEventListener",
          "removeEventListener",
          "postMessage",
          "getElementById",
          "dispatch",
          "commit",
          "includes",
          "indexOf",
          "endsWith",
          "startsWith",
        ],
      },
    }],
    "localI18n/literal-label-attribute": "warn",
  },
}, {
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts", "examples/**", "skills"]
}];

export default eslintConfig;
