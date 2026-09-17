<template lang="pug">
div.term-table
  div.term-table-controls
    input.term-table-search(
      type="search",
      v-model="query",
      placeholder="搜索中文 / 英文 / 日文术语…",
      aria-label="搜索术语"
    )
    span.term-table-count 共 {{ filtered.length }} 条
  div.term-table-empty(v-if="filtered.length === 0") 没有匹配的术语。
  table(v-else)
    thead
      tr
        th 中文
        th English
        th 日本語
        th 说明
    tbody
      tr(v-for="(row, i) in filtered", :key="i")
        td {{ row.zh }}
        td {{ row.en }}
        td.term-ja {{ row.ja }}
        td.term-note
          span(v-html="renderInline(row.note)")
</template>

<script setup>
import { computed, ref } from "vue";
import { terminology } from "../data/terminology";

// 中英日术语对照表（可搜索）。
const query = ref("");
const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return terminology;
  return terminology.filter((row) =>
    [row.zh, row.en, row.ja, row.note]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
});

function renderInline(text) {
  return String(text || "").replace(/`([^`]+)`/g, "<code>$1</code>");
}
</script>

<style scoped>
.term-table {
  margin: 1rem 0;
}
.term-table-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
}
.term-table-search {
  flex: 1 1 16rem;
  min-width: 10rem;
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--vp-c-divider, #e2e2e3);
  border-radius: 5px;
  background: var(--vp-c-bg, #fff);
  color: inherit;
  font-size: 0.9rem;
}
.term-table-count {
  font-size: 0.82rem;
  opacity: 0.7;
}
.term-ja {
  font-size: 0.86rem;
  opacity: 0.85;
}
.term-note {
  font-size: 0.82rem;
  opacity: 0.8;
}
.term-table-empty {
  padding: 1rem 0;
  opacity: 0.7;
}
</style>
