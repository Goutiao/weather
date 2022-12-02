<template>
  <van-swipe-cell right-width="50">
    <!-- -->
    <div class="weather-card">
      <div class="left">
        <div class="first" v-show="isShow">
          <van-icon name="wap-nav" size="20" />
        </div>
        <div class="second">
          <div class="location">{{ data.location.name }}</div>
          <div class="air-temp">
            <p>空气质量</p>
            <p>{{ highest }}°&nbsp/&nbsp {{ lowest }}°</p>
          </div>
        </div>
      </div>
      <div class="right">
        <span> {{ nowTemp }}°</span>
        <van-checkbox :name="areacode" v-show="isShow"></van-checkbox>
      </div>
    </div>
    <template #right class="hidden">
      <van-icon name="delete" @click="deleteCity()" />
    </template>
  </van-swipe-cell>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
// import { useAreaStore } from "@/store/store";
import { getNowTemp, getWeekWeather } from "@/request/api";
import { onMounted, ref, reactive } from "vue";
import { RealtimeInitData } from "@/type/NowWeather";
const props = defineProps({
  areacode: { type: String, default: "" },
  isShow: { type: Boolean, default: false },
  flag: { type: Boolean, default: true },
});
let areacode = props.areacode;
const data = reactive(new RealtimeInitData());
// const store = useAreaStore();
const router = useRouter();
// let areaList = store.$state.areaPosiList;
let nowTemp = ref();
let highest = ref();
let lowest = ref();
const emit = defineEmits(["deleteCity"]);
const deleteCity = () => {
  areacode = "";
  emit("deleteCity", areacode);
};

//获取当前温度和地址名
const getNowTemperature = () => {
  getNowTemp(areacode).then((res) => {
    data.realtime = res.data.result.realtime;
    data.location = res.data.result.location;
    nowTemp.value = Math.floor(data.realtime.temp);
  });
};
const tempRange = () => {
  getWeekWeather(areacode, "1").then((res) => {
    highest.value = res.data.result.daily_fcsts[0].high;
    lowest.value = res.data.result.daily_fcsts[0].low;
  });
};
onMounted(() => {
  getNowTemperature();
  tempRange();
});
</script>

<style scoped lang="sass">
 //缩小版天气卡片
:deep(.van-swipe-cell__wrapper)
  height: 2.5rem
.weather-card
  height: 100%
  width: 94%
  background-color: black
  text-align: left
  display: flex
  justify-content: space-between
  align-items: center
  border-radius: .6rem
  margin: 13px
  color: #E8F5F2
  background: url('@/assets/bg/4.gif') no-repeat
  background-size: 100% 100%

  .left
    display: flex
    justify-content: center
    align-items: center
    .first
      margin-left: .4rem
    .second
      margin-left: .4rem
    .location
      font-size: .5rem
      height: .6rem
    .air-temp
      display: flex
      font-size: .36rem
      margin-top: 0
      height: .5rem
      p
        margin-right: .4rem
.right
  display: flex
  justify-content: flex-end
  align-content: center
  margin-right: .4rem
  width: 30%
  span
    font-size: 40px
  :deep(.van-checkbox)
    margin-left: .2rem
:deep(.van-swipe-cell__right)
  font-size: 1rem
  width: 1rem
  color: #9A9899
  text-align: center
  line-height: 93px
</style>