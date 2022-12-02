<template>
  <!-- 头部导航栏 -->
  <div class="header">
    <van-nav-bar :title="data.location.name" border:false>
      <template #left>
        <van-icon name="plus" size="25" @click="addCity(areacode)" />
      </template>
      <template #right>
        <van-popover
          v-model:show="showPopover"
          :actions="actions"
          @select="onSelect"
          :offset="[10, 8]"
          placement="bottom-end"
        >
          <template #reference>
            <van-icon name="ellipsis" size="25" class="rotate" />
          </template>
        </van-popover>
      </template>
    </van-nav-bar>
  </div>
  <!-- 主体显示温度 -->
  <div class="temper-now">
    <div class="temperature">{{ temp }}<span>°C</span></div>
    <div class="meteorology">{{ data.realtime.text }}</div>
    <div class="feedback">反馈</div>
  </div>
  <!-- 主页大致的天气 -->
  <div class="part-weather">
    <!-- 空气和降水 -->
    <div class="air-water">
      <div class="air">
        <Svg :iconClass="iconList[0]" size="20px"></Svg>
        <p>空气{{ realAir.air.aqi_level }}&nbsp{{ realAir.air.aqi }}</p>
      </div>
    </div>
    <!-- 三天内的天气 -->
    <div
      class="three-days"
      v-for="(item, index) in station.daily"
      :key="item.high"
    >
      <div class="left">
        <Svg
          :iconClass="iconMap[item.code_day as keyof typeof iconMap]"
          size="30px"
        ></Svg>
        <span>&nbsp;{{ week[index] }} &nbsp;·&nbsp;</span
        ><span>{{ item.text_day }}&nbsp;</span>
        <div class="air-station">{{ realAir.air.aqi_level }}</div>
      </div>
      <div class="right">
        <span>{{ item.high }}°&nbsp;/&nbsp;</span>
        <span>{{ item.low }}°</span>
      </div>
    </div>
    <van-button round size="large" @click="goweek(areacode)"
      >查看近十五日天气</van-button
    >
  </div>
</template>
  
  <script setup lang="ts">
import { getWeekWeather, getNowTemp, getAir } from "@/request/api";
import { useAreaStore } from "@/store/store";
import { useRouter } from "vue-router";
import { RealtimeInitData } from "@/type/NowWeather";
import { WeekWeaInitData } from "@/type/weekWheather";

import { onMounted, reactive, ref, computed } from "vue";
import { airInitData } from "@/type/air";
import { Toast } from "vant";
const store = useAreaStore();
const data = reactive(new RealtimeInitData());
const station = reactive(new WeekWeaInitData());
const router = useRouter();
const addCity = (data: string) => {
  store.initAreaPosition(data);
  router.push({
    name: "city",
    params: {
      areacode: data,
    },
  });
};
const showPopover = ref(false);
// 通过 actions 属性来定义菜单选项
const actions = [{ text: "分享天气" }, { text: "反馈天气" }, { text: "设置" }];
const onSelect = (action: any) => Toast(action.text);
const realAir = reactive(new airInitData());
const iconList = ["icon-kongqizhiliang", "icon-jishui"];
const props = defineProps({
  areacode: { type: String, default: "locate.value" },
});
let areacode = props.areacode;
const iconMap = {
  "00": "icon-qing-baitian",
  "01": "icon-duoyun",
  "02": "icon-yintian",
  "03": "icon-zhenyu",
  "04": "icon-leizhenyu",
  "05": "icon-leizhenyubanyoubingbao",
  "06": "icon-yujiaxue",
  "07": "icon-xiaoyu",
  "08": "icon-zhongyu",
  "09": "icon-dayu",
  "10": "icon-baoyu",
  "11": "icon-dabaoyu",
  "12": "icon-tedabaoyu",
  "13": "icon-zhenxue",
  "14": "icon-tianqi-xiaoxue",
  "15": "icon-zhongxue",
  "16": "icon-tianqi-xiaoxue",
  "17": "icon-baoxue1",
  "18": "icon-wu",
  "19": "icon-dongyu",
  "20": "icon-shachenbao",
  "21": "icon-zhongyu",
  "22": "icon-dayu",
  "23": "icon-baoyu",
  "24": "icon-dabaoyu",
  "25": "icon-dtedabaoyu",
  "26": "icon-zhongxue",
  "27": "icon-daxue",
  "28": "icon-baoxue1",
  "29": "icon-fuchen",
  "30": "icon-yangsha",
  "31": "icon-qiangshachenbao",
  "32": "icon-nongwu",
  "33": "icon-longjuanfeng",
  "34": "icon-duoyun",
  "35": "icon-tianqi-qingwu",
  "49": "icon-qiangnongwu",
  "53": "icon-mai",
  "54": "icon-zhongduwumai1",
  "56": "icon-yanzhongmai",
  "57": "icon-teqiangnongwu",
  "301": "icon-xiaoyu",
  "302": "icon-xiaoxue",
};
const temp = computed(() => {
  return Math.round(data.realtime.temp);
});
const goweek = (data: string) => {
  console.log(data);

  router.push({
    name: "weeks",
    params: {
      areacode: data,
    },
  });
};
const getAirData = () => {
  getAir(areacode).then((res) => {
    realAir.air.aqi = res.data.result.realtimeAqi.aqi;
    realAir.air.aqi_level = res.data.result.realtimeAqi.aqi_level;
  });
};
let week = ref();
const getWeather = () => {
  getNowTemp(areacode).then((res) => {
    data.realtime = res.data.result.realtime;
    data.location = res.data.result.location;
  });
  getAirData();
  getWeekWeather(areacode, "3").then((res) => {
    station.daily = res.data.result.daily_fcsts;
    const d = new Date();
    week.value = Array.from(station.daily, ({ week }) => week);
    var days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    week.value.forEach((item: string, index: number) => {
      switch (item) {
        case "星期一":
          item = "周一";
          break;
        case "星期二":
          item = "周二";
          break;
        case "星期三":
          item = "周三";
          break;
        case "星期四":
          item = "周四";
          break;
        case "星期五":
          item = "周五";
          break;
        case "星期六":
          item = "周六";
          break;
        case "星期日":
          item = "周日";
          break;
      }
      week.value[index] = item;
    });
    week.value.forEach((item: string, index: number) => {
      if (item == days[d.getDay()]) {
        item = "今天";
      } else if (item == days[d.getDay() + 1]) {
        item = "明天";
      } else {
        return item;
      }
      week.value[index] = item;
    });
  });
};
onMounted(() => {
  getWeather();
});
</script>

  <style scoped lang="sass">
.header
  :deep(.van-nav-bar__content)
    height: 1.4rem
    font-size: .5rem
    font-weight: 900
    background-color: rgba(206,179,150,.9)
    --van-nav-bar-title-text-color: var(--van-white)
    --van-nav-bar-title-font-size: var(--van-font-size-lg)
    --van-nav-bar-icon-color: var(--van-white)
    :deep(.van-icon-ellipsis)
      transform: rotate(-90deg)
.temper-now
  width: 100%
  height: 40%
  color: white
  font-weight: 600
  .temperature
    position: relative
    height: 200px
    text-align: center
    line-height: 7rem
    font-size: 3.5rem
    font-weight: 500
    span
      position: absolute
      top: -40px
      right: 2.5rem
      font-size: .6rem
      font-weight: 700
  .meteorology
    margin-top: .6rem
    font-size: 25px
    font-weight: 700
  .feedback
    height: .8rem
    width: 1.2rem
    line-height: .8rem
    font-size: .4rem
    margin: 0 auto
    border-radius: .3rem
    margin-top: .2rem
    background-color: rgba(91,109,139,.1)
.part-weather
  margin-top: 18%
  margin-left: .5rem
  margin-right: .5rem
  .air-water
    display: flex
    justify-content: space-between
    margin-bottom: .6rem
    .air
      display: flex
      font-size: .4rem
      font-weight: 600
      p
        margin-left: .3rem
.three-days
  display: flex
  justify-content: space-between
  font-size: .5rem
  font-weight: 600
  color: #FFFFFF
  margin-bottom: .75rem
  .left
    display: flex
    .air-station
      width: 1rem
      height: .6rem
      font-size: .4rem
      background-color: rgba(250,247,247,.2)
      border-radius: .1rem
      text-align: center
      line-height: .6rem
:deep(.van-button)
  opacity: .5
</style>