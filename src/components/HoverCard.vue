<template lang="pug">
span.hover-card(
  tabindex="0",
  role="button",
  :aria-label="'查看「' + displayName + '」的说明'",
  :aria-expanded="open && !!entry ? 'true' : 'false'",
  @mouseenter="open = true",
  @mouseleave="open = false",
  @focus="open = true",
  @blur="open = false",
  @click="open = !open",
  @keydown.esc="open = false",
  @keydown.enter.prevent="open = !open",
  @keydown.space.prevent="open = !open"
)
  code.hover-card-name {{ displayName }}
  span.hover-card-pop(
    v-if="open && entry",
    role="tooltip",
    :class="{ 'is-flip': flip }"
  )
    span.hover-card-head
      code.hover-card-title {{ displayName }}
      span.hover-card-kind {{ kindLabel }}
    p.hover-card-desc(v-html="entry.desc")
    p.hover-card-sig(v-if="entry.sig")
      code {{ entry.sig }}
    ul.hover-card-meta(v-if="meta.length")
      li(v-for="m in meta", :key="m.k")
        span.hover-card-meta-key {{ m.k }}
        span {{ m.v }}
    a.hover-card-link(v-if="link", :href="link") 查看详情 →
</template>

<script setup>
import { computed, ref } from "vue";
import { withBase } from "../utils/withBase";
import { variables } from "../data/variables";
import { commands } from "../data/commands";

// 行内悬浮卡：把正文里的变量名 / 命令名包一层，悬停（或聚焦 / 点击）时
// 弹出速查小卡。数据来自 src/data/，查不到时退化为普通文本。
const props = defineProps({
  kind: { type: String, default: "var" }, // "var" | "cmd"
  name: { type: String, required: true },
  flip: { type: Boolean, default: false },
});

const dict = props.kind === "cmd" ? commands : variables;
const entry = dict[props.name] || null;
const displayName = props.name;
const link = entry?.link ? withBase(entry.link) : "";
const kindLabel = props.kind === "cmd" ? "命令" : "变量";

const meta = computed(() => {
  if (!entry) return [];
  const out = [];
  if (props.kind === "cmd") {
    if (entry.category) out.push({ k: "分类", v: entry.category });
  } else {
    if (entry.type) out.push({ k: "类型", v: entry.type });
    if (entry.scope) out.push({ k: "作用域", v: entry.scope });
    if (entry.dim) out.push({ k: "维度", v: entry.dim });
  }
  return out;
});

const open = ref(false);
</script>

<style scoped>
.hover-card {
  position: relative;
  cursor: help;
  border-bottom: 1px dashed var(--vp-c-accent, #7c00fb);
  outline: none;
}
.hover-card:focus-visible {
  background: var(--vp-c-accent-soft, rgba(124, 0, 251, 0.14));
}
.hover-card-pop {
  position: absolute;
  left: 0;
  top: 1.5em;
  z-index: 30;
  box-sizing: border-box;
  width: max-content;
  max-width: min(22rem, 80vw);
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--vp-c-divider, #e2e2e3);
  border-radius: 6px;
  background: var(--vp-c-bg-elv, #fff);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
  font-size: 0.82rem;
  font-weight: normal;
  line-height: 1.6;
  white-space: normal;
  text-align: left;
  color: var(--vp-c-text, #3c3c43);
  cursor: auto;
}
.hover-card-pop.is-flip {
  left: auto;
  right: 0;
}
.hover-card-head {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  margin-bottom: 0.25rem;
}
.hover-card-title {
  font-weight: 600;
  color: var(--vp-c-accent, #7c00fb);
}
.hover-card-kind {
  padding: 0 0.3rem;
  border-radius: 3px;
  background: var(--vp-c-accent-soft, rgba(124, 0, 251, 0.14));
  font-size: 0.72rem;
  color: var(--vp-c-accent, #7c00fb);
}
.hover-card-desc {
  margin: 0;
}
.hover-card-sig {
  margin: 0.35rem 0 0;
}
.hover-card-sig code {
  word-break: break-all;
}
.hover-card-meta {
  margin: 0.35rem 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem 0.75rem;
  font-size: 0.78rem;
  opacity: 0.85;
}
.hover-card-meta-key::after {
  content: "：";
}
.hover-card-link {
  display: inline-block;
  margin-top: 0.4rem;
  color: var(--vp-c-accent, #7c00fb);
  text-decoration: none;
}
.hover-card-link:hover {
  text-decoration: underline;
}
</style>
