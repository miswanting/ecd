<template lang="pug">
div.error-index
  div.error-index-controls
    input.error-index-search(
      type="search",
      v-model="query",
      placeholder="搜索错误信息（支持日文片段）…",
      aria-label="搜索错误信息"
    )
    select.error-index-level(v-model="level", aria-label="按级别筛选")
      option(value="") 全部级别
      option(value="1") 警告
      option(value="2") 错误
      option(value="3") 致命错误
    span.error-index-count 共 {{ filtered.length }} 条
  div.error-index-empty(v-if="filtered.length === 0") 没有匹配的错误信息。
  table.error-index-table(v-else)
    thead
      tr
        th 原文
        th 级别
        th 来源
    tbody
      tr(v-for="(row, i) in filtered", :key="i")
        td.error-index-message {{ row.message }}
        td
          span.error-index-badge(:class="'lv-' + row.level") {{ levelLabel(row.level) }}
        td.error-index-file
          code {{ row.file }}
</template>

<script setup>
import { computed, ref } from "vue";
import { errorMessages } from "../data/errorMessages";

// 引擎错误 / 警告文案的可搜索索引。数据由 scripts/gen-error-index.js 从
// 只读参考工程 .ref/Emuera 的源码中提取，因此与原实现完全一致。
const query = ref("");
const level = ref("");

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return errorMessages.filter((row) => {
    if (level.value && String(row.level) !== level.value) return false;
    if (!q) return true;
    return (
      row.message.toLowerCase().includes(q) ||
      row.file.toLowerCase().includes(q)
    );
  });
});

function levelLabel(lv) {
  return lv === 3 ? "致命" : lv === 2 ? "错误" : "警告";
}
</script>

<style scoped>
.error-index {
  margin: 1rem 0;
}
.error-index-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
}
.error-index-search {
  flex: 1 1 16rem;
  min-width: 10rem;
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--vp-c-divider, #e2e2e3);
  border-radius: 5px;
  background: var(--vp-c-bg, #fff);
  color: inherit;
  font-size: 0.9rem;
}
.error-index-level {
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--vp-c-divider, #e2e2e3);
  border-radius: 5px;
  background: var(--vp-c-bg, #fff);
  color: inherit;
  font-size: 0.9rem;
}
.error-index-count {
  font-size: 0.82rem;
  opacity: 0.7;
}
.error-index-table {
  width: 100%;
  display: block;
  max-height: 32rem;
  overflow: auto;
}
.error-index-table thead th {
  position: sticky;
  top: 0;
  background: var(--vp-c-bg, #fff);
  text-align: left;
  font-size: 0.8rem;
  opacity: 0.75;
  border-bottom: 1px solid var(--vp-c-divider, #e2e2e3);
}
.error-index-message {
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.82rem;
  word-break: break-all;
}
.error-index-badge {
  padding: 0 0.35rem;
  border-radius: 3px;
  font-size: 0.72rem;
  white-space: nowrap;
}
.lv-1 {
  background: var(--vp-c-yellow-soft, rgba(234, 179, 8, 0.14));
  color: var(--vp-c-yellow-text, #b45309);
}
.lv-2 {
  background: var(--vp-c-red-soft, rgba(239, 68, 68, 0.14));
  color: var(--vp-c-red-text, #b91c1c);
}
.lv-3 {
  background: var(--vp-c-red-soft, rgba(239, 68, 68, 0.2));
  color: var(--vp-c-red-text, #7f1d1d);
  font-weight: 600;
}
.error-index-file {
  font-size: 0.76rem;
  opacity: 0.6;
  white-space: nowrap;
}
</style>
