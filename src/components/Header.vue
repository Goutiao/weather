<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const addCity = () => {
  router.push({ path: "/city" });
};
const props = defineProps([]);
</script>

<template>
  <!-- 首页头部 -->
  <van-nav-bar title="城市" border:false>
    <template #left>
      <van-icon name="plus" size="20" @click="addCity" />
    </template>
    <template #right>
      <van-icon name="ellipsis" size="20" class="rotate" id="more" />
    </template>
  </van-nav-bar>
</template>
<style src="@/css/head.css"></style>
<style scoped lang="sass">
:deep(.van-nav-bar__content)
  height: 1.4rem
  font-size: .5rem
  background-color: pink
  font-weight: 900
  --van-nav-bar-title-text-color: var(--van-white)
  --van-nav-bar-title-font-size: var(--van-font-size-lg)
  --van-nav-bar-icon-color: var(--van-white)
  .van-icon-ellipsis
    transform: rotate(-90deg)
</style>