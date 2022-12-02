<template>
  <div class="city">
    <!-- 城市头部页面 -->
    <div class="header" v-show="!isShow">
      <div class="ico"><van-icon name="down" @click="back" /></div>
      <div class="func" @click="backHome">城市管理</div>
      <div class="part-two">
        <van-search
          v-model="input"
          placeholder="搜索全球天气"
          @focus="locate"
        />
      </div>
    </div>
    <!-- 城市头部选中页面 -->
    <div class="header" v-show="isShow">
      <div class="ico">
        <van-icon name="cross" size="30" @click="cancle" />
        <van-icon name="bars" size="30" @click="checkAll" />
      </div>
      <div class="func" v-show="!isShow">请选择项目</div>
      <div class="func" v-show="isShow">已选择{{ checked.length }}项</div>
      <div class="part-two">
        <van-search
          v-model="input"
          placeholder="搜索全球天气"
          @focus="locate"
        />
      </div>
    </div>
    <!-- 城市管理部分 -->
    <van-checkbox-group v-model="checked" ref="checkboxGroup">
      <div v-for="(item, index) in areaList" :key="item">
        <CityCard
          :areacode="item"
          :isShow="isShow"
          :flag="flag"
          @deleteCity="store.deleteCity(index)"
          @touchstart="gotouchstart"
          @touchmove="gotouchmove"
          @touchend="gotouchend(item)"
        ></CityCard>
      </div>
      <!-- @touchend="gotouchend" -->
    </van-checkbox-group>
    <!-- 一键删除选中选项 -->
    <van-action-bar v-show="isShow" class="dele-all" @click="deleChoose">
      <van-icon name="delete-o" size="30" />
      <div>删除</div>
    </van-action-bar>
  </div>
</template>

<script setup lang="ts">
import CityCard from "@/components/CityCard.vue";
import { useAreaStore } from "@/store/store";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
const store = useAreaStore();
const checked = ref([]);
const checkboxGroup = ref();
const flag = ref(true);
let isShow = ref(false);
let areaList = store.$state.areaPosiList;
const router = useRouter();
const input = ref("");
const back = () => {
  router.go(-1);
};
const props = defineProps({
  areacode: { type: String, default: "" },
});
const checkAll = () => {
  checkboxGroup.value.toggleAll(true);
};
const deleChoose = () => {
  //console.log(checked.value);
  checked.value.map((item) => {
    console.log(areaList.indexOf(item));
    store.deleteCity(areaList.indexOf(item));
  });
  checked.value = [];
};
const locate = () => {
  router.push({ path: "/geologation" });
};
const cancle = () => {
  isShow.value = !isShow.value;
  isClick.value = !isClick.value;
};
const gohome = (data: string) => {
  router.push({
    name: "home",
    params: {
      areacode: data,
    },
  });
};
let isClick = ref(true);
let timeOut = 0;
const gotouchstart = () => {
  clearTimeout(timeOut);
  timeOut = window.setTimeout(function () {
    console.log("长按");
    isClick.value = !isClick.value;
    isShow.value = !isShow.value;
    flag.value = !flag.value;
  }, 500);
  return false;
};
const gotouchend = (item: string) => {
  clearTimeout(timeOut);
  console.log(isClick.value);
  if (isClick.value) {
    console.log("执行点击事件");
    gohome(item);
  }
  return false;
};
const gotouchmove = () => {
  console.log("手指移动了");
  isClick.value = false;
};
const backHome = () => {
  router.push({ path: "/home" });
};
onMounted(() => {
  store.initAreaPosition(props.areacode);
});
</script>

<style src="@/css/head.css"></style>
<style scoped lang="sass" deep>
.city
  width: 100%
  height: 100%
  .header
    padding-left: 20px
    padding-top: 20px
    width: 90%
    height: 21%
    display: flex
    flex-direction: column
    align-items: baseline
    .van-icon-down
      transform: rotate(-270deg)
    .ico
      width: 100%
      display: flex
      flex-direction: row
      justify-content: space-between
      align-content: flex-end
    .func
      font-size: .6rem
      padding: .5rem 0
    .part-two
      height: 80px
      width: 89%
    :deep(.van-search)
      width: 100%
      height: 36px
      border-radius: .7rem !important
      background-color: #F7F8FA
  .dele-all
    display: flex
    flex-direction: column
    justify-content: center
    color: #B4B4B4
    margin-bottom: .4rem
    div
      font-size: .5rem
</style>