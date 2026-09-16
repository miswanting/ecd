<template lang="pug">
div.flow-nav(role="list")
  template(v-for="(stage, si) in stages", :key="si")
    div.flow-stage(role="listitem")
      div.flow-stage-head {{ stage.title }}
      div.flow-stage-body(:class="'is-' + (stage.mode || 'sequence')")
        template(v-for="(node, ni) in stage.nodes", :key="ni")
          span.flow-arrow(v-if="stage.mode === 'sequence' && ni > 0", aria-hidden="true") →
          a.flow-node(
            v-if="node.href",
            :class="'kind-' + (node.kind || 'engine')",
            :href="node.href"
          )
            span.flow-node-label {{ node.label }}
            span.flow-node-desc(v-if="node.desc") {{ node.desc }}
          span.flow-node.is-static(
            v-else,
            :class="'kind-' + (node.kind || 'engine')"
          )
            span.flow-node-label {{ node.label }}
            span.flow-node-desc(v-if="node.desc") {{ node.desc }}
    div.flow-stage-arrow(v-if="si < stages.length - 1", aria-hidden="true") ↓
</template>

<script setup>
import { withBase } from "../utils/withBase";
import { eventFlow } from "../data/flow";

// 交互式流程图：把「引擎在什么时机调用哪个函数」画成一列可点击的节点。
// 数据来自 src/data/flow.js，节点点击跳到对应文档。
const props = defineProps({
  stages: { type: Array, default: () => eventFlow.stages },
});

const stages = props.stages.map((stage) => ({
  ...stage,
  nodes: stage.nodes.map((node) => ({
    ...node,
    href: node.link ? withBase(node.link) : "",
  })),
}));
</script>

<style scoped>
.flow-nav {
  margin: 1rem 0;
}
.flow-stage {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}
.flow-stage-head {
  flex: 0 0 7.5rem;
  padding-top: 0.45rem;
  text-align: right;
  font-size: 0.82rem;
  font-weight: 600;
  opacity: 0.7;
}
.flow-stage-body {
  flex: 1 1 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
}
.flow-stage-body.is-choice .flow-node {
  flex: 0 0 auto;
}
.flow-arrow {
  color: var(--vp-c-accent, #7c00fb);
  font-weight: 700;
}
.flow-node {
  display: inline-flex;
  flex-direction: column;
  gap: 0.1rem;
  max-width: 16rem;
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--vp-c-divider, #e2e2e3);
  border-left-width: 3px;
  border-radius: 5px;
  background: var(--vp-c-bg-soft, rgba(0, 0, 0, 0.02));
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease,
    border-color 0.12s ease;
}
a.flow-node:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  border-color: var(--vp-c-accent, #7c00fb);
}
.flow-node-label {
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.85rem;
  font-weight: 600;
}
.flow-node-desc {
  font-size: 0.74rem;
  line-height: 1.45;
  opacity: 0.72;
}
.kind-event {
  border-left-color: var(--vp-c-accent, #7c00fb);
}
.kind-command {
  border-left-color: var(--vp-c-indigo, #3451b2);
}
.kind-engine {
  border-left-color: var(--vp-c-grey, #9a9a9a);
}
.flow-node.is-static {
  opacity: 0.85;
}
.flow-stage-arrow {
  margin: 0.15rem 0 0.15rem 8.25rem;
  color: var(--vp-c-accent, #7c00fb);
  font-weight: 700;
  line-height: 1;
}
@media (max-width: 600px) {
  .flow-stage {
    flex-direction: column;
    gap: 0.25rem;
  }
  .flow-stage-head {
    flex-basis: auto;
    padding-top: 0;
    text-align: left;
  }
  .flow-stage-arrow {
    margin-left: 0.25rem;
  }
}
</style>
