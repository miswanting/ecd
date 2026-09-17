<template lang="pug">
div.compat
  div.compat-controls
    label.compat-filter(v-for="f in filters", :key="f.value")
      input(type="radio", :value="f.value", v-model="mode")
      span {{ f.label }}
    span.compat-count 共 {{ rows.length }} 项
  table.compat-table
    thead
      tr
        th 分类
        th 功能 / 特性
        th Eramaker
        th Emuera
        th 备注
    tbody
      tr(v-for="(row, i) in rows", :key="i")
        td.compat-category {{ row.category }}
        td.compat-name
          span(v-html="renderInline(row.name)")
        td.compat-mark(v-html="mark(row.eramaker)")
        td.compat-mark(v-html="mark(row.emuera)")
        td.compat-note(v-html="renderInline(row.note)")
  div.compat-legend
    span ✓ 支持
    span ✗ 不支持
    span.compat-diff △ 行为与另一引擎不同
</template>

<script setup>
import { computed, ref } from "vue";
import { compatibility } from "../data/compatibility";

// 兼容性矩阵：功能 × Eramaker / Emuera。可用筛选只看「差异项」或「Emuera 新增」。
const mode = ref("all");
const filters = [
  { value: "all", label: "全部" },
  { value: "diff", label: "仅差异项" },
  { value: "new", label: "仅 Emuera 新增" },
];

const rows = computed(() =>
  compatibility.filter((r) => {
    if (mode.value === "diff") return r.eramaker === "diff" || r.emuera === "diff";
    if (mode.value === "new") return r.eramaker === "no";
    return true;
  }),
);

function mark(status) {
  if (status === "yes") return '<span class="m-yes">✓</span>';
  if (status === "no") return '<span class="m-no">✗</span>';
  return '<span class="m-diff">△</span>';
}

// 数据里用 `code` 表示行内代码，这里简单转成 <code>
function renderInline(text) {
  return String(text || "").replace(/`([^`]+)`/g, "<code>$1</code>");
}
</script>

<style scoped>
.compat {
  margin: 1rem 0;
}
.compat-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.9rem;
  margin-bottom: 0.6rem;
  font-size: 0.86rem;
}
.compat-filter {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
}
.compat-count {
  opacity: 0.7;
}
.compat-table {
  width: 100%;
  font-size: 0.86rem;
}
.compat-table thead th {
  text-align: left;
  font-size: 0.8rem;
  opacity: 0.75;
  border-bottom: 1px solid var(--vp-c-divider, #e2e2e3);
}
.compat-category {
  white-space: nowrap;
  opacity: 0.7;
}
.compat-mark {
  text-align: center;
  font-weight: 700;
}
:deep(.m-yes) {
  color: var(--vp-c-green-text, #2f9e44);
}
:deep(.m-no) {
  color: var(--vp-c-text-subtle, #9a9a9a);
}
:deep(.m-diff) {
  color: var(--vp-c-yellow-text, #b45309);
}
.compat-note {
  font-size: 0.8rem;
  opacity: 0.8;
}
.compat-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  opacity: 0.75;
}
.compat-diff {
  color: var(--vp-c-yellow-text, #b45309);
}
</style>
