import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // `Link`/`ButtonLink` render an <a>, `Image` renders an <img> — tell jsx-a11y so its rules
    // (anchor-is-valid, alt-text...) check them like the native elements they produce.
    settings: { "jsx-a11y": { components: { Link: "a", ButtonLink: "a", Image: "img" } } },
    rules: {
      // `strict` supersedes eslint-config-next's own (looser) jsx-a11y rules, including its
      // `alt-text` override for `Image` — reapply that override on top.
      ...jsxA11y.flatConfigs.strict.rules,
      "jsx-a11y/alt-text": ["error", { elements: ["img"], img: ["Image"] }],
    },
  },
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts", ".claude/**"] },
];

export default eslintConfig;
