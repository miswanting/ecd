// 与框架无关的 base 前缀工具。
//
// VuePress 提供 `withBase`，VitePress 提供 `withBase`（从 vitepress 导入），
// 但两者路径不同。为了让 `src/components` 里的组件能被两条站点（VuePress
// 与并行的 VitePress）共用，这里统一改用 Vite 注入的 `import.meta.env.BASE_URL`。

const base =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.BASE_URL) ||
  "/";

/** 把站内绝对路径（如 `/reference/ERB_Variables`）补上站点 base。 */
export function withBase(path) {
  if (!path) return "";
  // 外链、协议相对链接、data URI 原样返回
  if (/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(path) || path.startsWith("data:")) {
    return path;
  }
  if (path.startsWith("#")) return path;
  return `${base.replace(/\/+$/, "")}/${String(path).replace(/^\/+/, "")}`;
}
