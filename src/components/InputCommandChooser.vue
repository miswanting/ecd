<template lang="pug">
CommandChooser(
  title="输入系命令选择器",
  template="{timer}{one}INPUT{type}",
  :groups="groups"
)
</template>

<script setup>
import CommandChooser from "./CommandChooser.vue";

// INPUT / INPUTS / TINPUT / TINPUTS / ONEINPUT / ONEINPUTS / TONEINPUT / TONEINPUTS
const groups = [
  {
    key: "timer",
    label: "时间限制：",
    options: [
      { label: "无", value: "" },
      { label: "有", value: "T" },
    ],
  },
  {
    key: "one",
    label: "输入长度：",
    options: [
      { label: "不限", value: "" },
      { label: "仅一个字符", value: "ONE" },
    ],
  },
  {
    key: "type",
    label: "输入内容：",
    options: [
      { label: "数值", value: "" },
      { label: "字符串", value: "S" },
    ],
  },
];
</script>
