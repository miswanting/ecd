<template lang="pug">
div.command-chooser
  div(v-if="title" class="command-chooser-title") {{ title }}
  div(v-for="g in groups", :key="g.key", class="command-chooser-group")
    span.command-chooser-label {{ g.label }}
    template(v-for="(o, i) in g.options", :key="g.key + '-' + i")
      input(
        type="radio",
        :id="id + '-' + g.key + '-' + i",
        :name="id + '-' + g.key",
        :checked="sel[g.key] === o.value",
        :disabled="isDisabled(o)",
        @change="setOption(g, o)"
      )
      label(:for="id + '-' + g.key + '-' + i") {{ o.label }}
  div.language-
    pre
      code {{ command() }}
</template>

<script setup>
import { reactive, useId } from "vue";

// 通用命令选择器：由 groups 描述可选项，用 template 决定拼接顺序。
// groups: [{ key, label, default?, options: [{ label, value, requires?, clears? }] }]
//   requires: { 其他 key: [允许的值...] }  仅当其他项取这些值时该项可用
//   clears:   [其他 key...]              选中该项时把这些项重置为默认值
// template: "{key}{other}LITERAL" 形式，未提供时按 base + 各组取值顺序拼接
const props = defineProps({
  title: { type: String, default: "" },
  base: { type: String, default: "" },
  template: { type: String, default: "" },
  groups: { type: Array, default: () => [] },
});

const id = useId();
const sel = reactive({});
props.groups.forEach((g) => {
  sel[g.key] = g.default ?? "";
});

function defaultValue(key) {
  const g = props.groups.find((x) => x.key === key);
  return g ? g.default ?? "" : "";
}

function isDisabled(option) {
  if (!option.requires) return false;
  return Object.entries(option.requires).some(([key, allowed]) => {
    const current = sel[key] ?? "";
    return !allowed.includes(current);
  });
}

function setOption(group, option) {
  sel[group.key] = option.value;
  (option.clears || []).forEach((key) => {
    sel[key] = defaultValue(key);
  });
}

function command() {
  const values = {};
  props.groups.forEach((g) => {
    values[g.key] = sel[g.key] ?? "";
  });
  if (props.template) {
    return props.template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
  }
  return props.base + props.groups.map((g) => values[g.key] ?? "").join("");
}
</script>

<style scoped>
.command-chooser-group {
  margin-bottom: 0.2rem;
}
.command-chooser-label {
  margin-right: 0.3rem;
}
</style>
