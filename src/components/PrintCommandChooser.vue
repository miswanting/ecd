<template lang="pug">
div
  span 单行溢出：
  input#overflow1(type="radio", name="overflow", value="", v-model="overflow")
  label(for="overflow1") 溢出后自动换行
  input#overflow2(
    type="radio",
    name="overflow",
    value="Single",
    v-model="overflow",
    @click="lineWait = ''"
  )
  label(for="overflow2") 溢出后不换行
div
  span 参数类型：
  input#type1(type="radio", name="type", value="", v-model="type")
  label(for="type1") 字符串
  input#type2(
    type="radio",
    name="type",
    value="V",
    v-model="type",
    :disabled="space !== ''"
  )
  label(for="type2") 数值表达式
  input#type3(
    type="radio",
    name="type",
    value="S",
    v-model="type",
    :disabled="space !== ''"
  )
  label(for="type3") 字符串表达式
  input#type4(type="radio", name="type", value="Form", v-model="type")
  label(for="type4") 格式化字符串
  input#type5(
    type="radio",
    name="type",
    value="FormS",
    v-model="type",
    :disabled="space !== ''"
  )
  label(for="type5") 格式化字符串表达式
div
  span 空格填充：
  input#space1(type="radio", name="space", value="", v-model="space")
  label(for="space1") 无填充
  input#space2(
    type="radio",
    name="space",
    value="LC",
    v-model="space",
    @click="overflow = ''; type = ''; lineWait = ''"
  )
  label(for="space2") 有，文字左对齐
  input#space3(
    type="radio",
    name="space",
    value="C",
    v-model="space",
    @click="overflow = ''; type = ''; lineWait = ''"
  )
  label(for="space3") 有，文字右对齐
div
  span 优先配色：
  input#color1(type="radio", name="color", value="", v-model="color")
  label(for="color1") 适用 SetColor
  input#color2(type="radio", name="color", value="K", v-model="color")
  label(for="color2") 适用 ForceKana
  input#color3(type="radio", name="color", value="D", v-model="color")
  label(for="color3") 忽略 SetColor
div
  span 换行等待：
  input#lineWait1(type="radio", name="lineWait", value="", v-model="lineWait")
  label(for="lineWait1") 无换行无等待
  input#lineWait2(
    type="radio",
    name="lineWait",
    value="L",
    v-model="lineWait",
    :disabled="overflow === 'Single' || space !== ''"
  )
  label(for="lineWait2") 只换行
  input#lineWait3(
    type="radio",
    name="lineWait",
    value="W",
    v-model="lineWait",
    :disabled="overflow === 'Single' || space !== ''"
  )
  label(for="lineWait3") 换行后等待
.language-
  pre 
    code {{ getCommand() }}
</template>
<script setup>
import { ref } from "vue";
const overflow = ref("");
const type = ref("");
const space = ref("");
const color = ref("");
const lineWait = ref("");
function getCommand() {
  let raw = "Print";
  raw += overflow.value;
  raw += type.value;
  raw += space.value;
  raw += color.value;
  raw += lineWait.value;
  return raw;
}
</script>