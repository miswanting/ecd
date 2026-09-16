<template lang="pug">
CommandChooser(
  title="CALL·JUMP·GOTO 系命令选择器",
  template="{try}{action}{form}{f}",
  :groups="groups"
)
</template>

<script setup>
import CommandChooser from "./CommandChooser.vue";

// JUMP / CALL / GOTO 及其 TRY、TRYC、FORM、CALLF 组合
const groups = [
  {
    key: "try",
    label: "错误处理：",
    options: [
      { label: "目标不存在即报错", value: "" },
      { label: "目标不存在也不报错（TRY 系）", value: "TRY" },
      { label: "目标不存在时进入 CATCH（TRYC 系）", value: "TRYC", clears: ["f"] },
    ],
  },
  {
    key: "action",
    label: "动作：",
    default: "CALL",
    options: [
      { label: "JUMP", value: "JUMP", clears: ["f"] },
      { label: "CALL", value: "CALL" },
      { label: "GOTO", value: "GOTO", clears: ["f"] },
    ],
  },
  {
    key: "form",
    label: "函数名形式：",
    options: [
      { label: "普通字符串", value: "" },
      { label: "FORM 格式", value: "FORM" },
    ],
  },
  {
    key: "f",
    label: "返回值处理：",
    options: [
      { label: "正常", value: "" },
      { label: "忽略返回值（F 系）", value: "F", requires: { try: [""], action: ["CALL"] } },
    ],
  },
];
</script>
