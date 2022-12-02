
<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  className: {
    type: String,
    default: "",
  },
  iconClass: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "20px",
  },
});

const classList = computed(() => {
  const res = ["icon", props.className || ""];
  return res;
});

const iconName = computed(() => {
  return `#${props.iconClass}`;
});
</script>

<style scoped>
.icon {
  /* v-bind是Vue3才支持的功能，可以将CSS的值与js的值绑定 */
  width: v-bind("props.size");
  height: v-bind("props.size");
  position: relative;
  vertical-align: -2px;
  fill: currentColor;
  font-weight: 700;
  color: #a94442;
  border: none;
}
</style>