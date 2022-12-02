<template>
  <div class="homelist">
    <van-swipe class="my-swipe" indicator-color="white" :loop="false">
      <van-swipe-item><HomeView></HomeView></van-swipe-item>
      <van-swipe-item
        v-if="isShow"
        v-for="(item, index) in showList"
        :key="index"
        ref="index"
      >
        <CityHome :areacode="item"></CityHome>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup lang="ts">
import HomeView from "./HomeView.vue";
import CityHome from "@/components/CityHome.vue";
import { useAreaStore } from "@/store/store";
import { computed } from "vue";
const store = useAreaStore();
const isShow = computed(() => {
  if (store.$state.areaPosiList.length == 0) {
    return false;
  } else return true;
});
// 深拷贝，并且移除定位
let showList = JSON.parse(JSON.stringify(store.$state.areaPosiList));
showList.shift();
</script>

<style scoped lang="sass">
.homelist
  background: url('@/assets/bg/1.gif') no-repeat
  background-size: 100% 100%
.my-swipe
  width: 100%
  height: 100%
</style>