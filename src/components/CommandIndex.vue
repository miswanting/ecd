<template lang="pug">
div.command-index
  div.command-index-controls
    input.command-index-search(
      type="search",
      v-model="query",
      placeholder="搜索命令名或签名…",
      aria-label="搜索命令"
    )
    select.command-index-group(v-model="group", aria-label="按分组筛选")
      option(value="") 全部分组
      option(v-for="g in groups", :key="g", :value="g") {{ g }}
    span.command-index-count 共 {{ filtered.length }} 条
  div.command-index-empty(v-if="filtered.length === 0") 没有匹配的命令。
  table.command-index-table(v-else)
    thead
      tr
        th 命令
        th 签名
        th 分组
    tbody
      tr(v-for="row in filtered", :key="row.slug")
        td.command-index-name
          a(:href="href(row)") {{ row.name }}
        td.command-index-signature
          code {{ row.signature }}
        td.command-index-group-cell {{ row.group }}
</template>

<script setup>
import { computed, ref } from "vue";
import { withBase } from "../utils/withBase";
import { commandIndex, commandGroups } from "../data/commandIndex";

// 可搜索 / 可按分组筛选的命令总表。数据由 scripts/gen-command-index.js 从
// docs/translation/Command.md 生成，锚点与 VuePress 的标题 slug 一致。
const query = ref("");
const group = ref("");

const rows = commandIndex.filter((e) => !e.section);
const groups = commandGroups;

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return rows.filter((row) => {
    if (group.value && row.group !== group.value) return false;
    if (!q) return true;
    return (
      row.name.toLowerCase().includes(q) ||
      row.signature.toLowerCase().includes(q)
    );
  });
});

function href(row) {
  return withBase("/translation/Command") + "#" + row.slug;
}
</script>

<style scoped>
.command-index {
  margin: 1rem 0;
}
.command-index-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
}
.command-index-search {
  flex: 1 1 14rem;
  min-width: 10rem;
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--vp-c-divider, #e2e2e3);
  border-radius: 5px;
  background: var(--vp-c-bg, #fff);
  color: inherit;
  font-size: 0.9rem;
}
.command-index-group {
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--vp-c-divider, #e2e2e3);
  border-radius: 5px;
  background: var(--vp-c-bg, #fff);
  color: inherit;
  font-size: 0.9rem;
}
.command-index-count {
  font-size: 0.82rem;
  opacity: 0.7;
}
.command-index-table {
  width: 100%;
  display: block;
  max-height: 32rem;
  overflow: auto;
}
.command-index-table thead th {
  position: sticky;
  top: 0;
  background: var(--vp-c-bg, #fff);
  text-align: left;
  font-size: 0.8rem;
  opacity: 0.75;
  border-bottom: 1px solid var(--vp-c-divider, #e2e2e3);
}
.command-index-name {
  white-space: nowrap;
}
.command-index-name a {
  font-family: var(--vp-font-family-mono, monospace);
  color: var(--vp-c-accent, #7c00fb);
}
.command-index-signature code {
  font-size: 0.82rem;
  word-break: break-all;
}
.command-index-group-cell {
  font-size: 0.8rem;
  opacity: 0.7;
  white-space: nowrap;
}
.command-index-empty {
  padding: 1rem 0;
  opacity: 0.7;
}
</style>
