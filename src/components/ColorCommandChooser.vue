<template lang="pug">
CommandChooser(
  title="颜色命令选择器",
  template="{action}{bg}COLOR{byName}",
  :groups="groups"
)
</template>

<script setup>
import CommandChooser from "./CommandChooser.vue";

// SETCOLOR / SETBGCOLOR / RESETCOLOR / RESETBGCOLOR / SETCOLORBYNAME / SETBGCOLORBYNAME
const groups = [
  {
    key: "action",
    label: "动作：",
    default: "SET",
    options: [
      { label: "设置", value: "SET" },
      { label: "重置", value: "RESET", clears: ["byName"] },
    ],
  },
  {
    key: "bg",
    label: "目标：",
    options: [
      { label: "文字颜色", value: "" },
      { label: "背景颜色", value: "BG" },
    ],
  },
  {
    key: "byName",
    label: "指定方式：",
    options: [
      { label: "RGB 数值", value: "" },
      { label: "颜色名称（BYNAME）", value: "BYNAME", requires: { action: ["SET"] } },
    ],
  },
];
</script>
