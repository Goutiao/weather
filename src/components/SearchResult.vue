<template>
  <!-- 显示搜索城市的天气 -->
  <div class="part-three">
    <div class="one" @click="goWeeks(areacode)">
      <div class="week">
        <span>{{ areaList.path }}</span>
        <van-icon
          name="add"
          size="30"
          color="#8B91B2"
          @click="added(areacode, 0)"
        />
      </div>
      <div class="week-weather">
        <van-grid :column-num="5" :border="false">
          <van-grid-item
            v-for="item in data.weeklist"
            key="item.week"
            class="weeks"
          >
            {{ item }}
          </van-grid-item>
          <van-grid-item
            v-for="item in text_day"
            key="item.text_day"
            class="text-day"
          >
            {{ item }}
          </van-grid-item>
          <van-grid-item v-for="item in highList" key="item.high" class="temp">
            {{ item }}°
          </van-grid-item>
          <van-grid-item
            v-for="item in lowList"
            style="height: 50px"
            class="temp"
            key="low"
          >
            {{ item }}°
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <div class="searchPath" v-for="(item, index) in pAreaList" key="item.value">
      <p @click="goWeeks(pAreaList[index].areacode)">{{ item.path }}</p>
      <svg
        class="icon plus"
        @click="added(pAreaList[index].areacode, index)"
        v-if="!item.isAdd"
      >
        <use xlink:href="#icon-jia"></use>
      </svg>
      <p v-if="item.isAdd">已添加</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getWeekWeather } from "@/request/api";
import { reactive, onMounted, ref, computed } from "vue";
import { WeekWeaInitData } from "@/type/weekWheather";
import router from "@/router";
import { useAreaStore } from "@/store/store";
const store = useAreaStore();
let data = reactive(new WeekWeaInitData());
let highList = ref();
let lowList = ref();
let text_day = ref();
let week = ref();
const props = defineProps(["areaList"]);
let areaList = props.areaList[0];
const areacode = areaList.areacode;
const area = props.areaList;
area.shift();
let pAreaList = area;
const days = "5";
// let daylist;
const getWeekWeatherData = (str: string, days: string) => {
  if (str !== "") {
    getWeekWeather(str, days).then((res) => {
      data.daily = res.data.result.daily_fcsts;
      //获取日期字符串
      highList.value = Array.from(data.daily, ({ high }) => high);
      lowList.value = Array.from(data.daily, ({ low }) => low);
      text_day.value = Array.from(data.daily, ({ text_day }) => text_day);
      week.value = Array.from(data.daily, ({ week }) => week);
      let weeks = computed(() => {
        return week.value;
      });
      const d = new Date();
      var days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      weeks.value.forEach((item: string, index: number) => {
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
        weeks.value[index] = item;
      });
      weeks.value.forEach((item: string, index: number) => {
        if (item == days[d.getDay()]) {
          item = "今天";
        } else if (item == days[d.getDay() + 1]) {
          item = "明天";
        } else {
          return item;
        }
        weeks.value[index] = item;
      });
      data.weeklist = weeks.value;
    });
  }
};
const added = (data: string, index: number) => {
  store.addCityPosition(data);
  pAreaList[index].isAdd = !pAreaList[index].isAdd;
  pAreaList[index].isAdded = !pAreaList[index].isAdded;
  console.log(pAreaList[index].areacode);
  console.log(store.$state.areaPosiList);
};
//点击查看十五天天气详情页
const goWeeks = (data: string) => {
  if (data !== "") {
    console.log("jinru");

    router.push({
      name: "weeks",
      params: {
        areacode: data,
        days: "15",
      },
    });
  }
};
onMounted(() => {
  getWeekWeatherData(areacode, days);
  console.log(typeof areacode);
});
</script>

<style scoped lang="sass">
.part-three
  display: flex
  flex-direction: column
  align-content: center
  height: 100px
  line-height: 60px
.week
  width: 90%
  display: flex
  justify-content: space-between
  text-align: center
  height: 40px
  line-height: 1.1rem
  font-size: .4rem
  font-weight: 550
  margin: 20px 16px
  .van-icon-add::before
    margin-bottom: 0
    text-align: center
    padding-top: 5px
.week-weather
  border-bottom: 1px solid #F3F3F3
  .weeks :deep( .van-grid-item__content)
    height: 20px
    font-size: .35rem
  .text-day :deep( .van-grid-item__content)
    height: 50px !important
    font-size: .4rem
  .temp :deep( .van-grid-item__content)
    height: 30px !important
    font-size: .45rem
    font-weight: 700
.searchPath
  height: 1.2rem
  margin: .1rem .4rem
  display: flex
  font-size: 25px
  font-weight: 600
  justify-content: space-between

  .plus
    width: .5rem
    height: .5rem
    line-height: 1.2rem
    padding: 18px 0
    color: #8B91B2
  p
    color: black
    font-size: 16px
</style>