 <!-- 该页面展示十五天的天气详情信息，包括时间、白天气象、晚上气象、当天风力风向，以及空气质量 -->
<template>
  <div class="half-Weather">
    <!-- 1.头部导航栏 -->
    <div class="header">
      <van-nav-bar
        :title="data.location.name"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        :size="25"
      />
    </div>
    <!-- 2.显示天气所属地域 -->
    <div class="section">{{ data.location.name }}</div>
    <!-- 3.滑动展示天气 -->
    <div class="hidden">
      <div class="body">
        <!-- 3.1显示周几 -->
        <van-grid direction="horizontal" class="week" :border="false">
          <van-grid-item v-for="item in week" :text="item" key="item.week" />
        </van-grid>
        <!-- 3.2显示日期 -->
        <van-grid
          direction="vertical"
          :column-num="15"
          class="time"
          :border="false"
        >
          <van-grid-item v-for="item in time" :text="item" key="item.time" />
        </van-grid>
        <!-- 3.3显示白天气象图标 -->
        <van-grid
          direction="vertical"
          :column-num="15"
          class="day-icon"
          :border="false"
        >
          <van-grid-item
            direction="vertical"
            :column-num="15"
            v-for="item in code_day"
            :border="false"
          >
            <Svg
              :iconClass="iconMap[item as keyof typeof iconMap]"
              size="32px"
            ></Svg>
          </van-grid-item>
        </van-grid>
        <!-- 3.4显示白天气象 -->

        <van-grid
          direction="vertical"
          :column-num="15"
          class="text_day"
          :border="false"
        >
          <van-grid-item
            v-for="item in text_day"
            :text="item"
            key="item.text_day"
          />
        </van-grid>
        <!-- 3.5显示白天和晚上的气温折线图 -->
        <van-grid class="temp" :border="false">
          <div ref="main" style="width: 1150px; height: 160px"></div>
        </van-grid>
        <!-- 3.6显示风力 -->
        <van-grid
          direction="vertical"
          :column-num="15"
          class="wind"
          :border="false"
        >
          <van-grid-item v-for="item in wc_night" key="item.wc_night">
            <span> {{ item }}</span>
          </van-grid-item>
        </van-grid>
        <!-- 3.7显示晚上气象图标 -->
        <van-grid
          direction="vertical"
          :column-num="15"
          class="day-icon"
          :border="false"
        >
          <van-grid-item
            direction="vertical"
            :column-num="15"
            v-for="item in code_night"
            :border="false"
          >
            <Svg
              :iconClass="iconMap[item as keyof typeof iconMap]"
              size="32px"
            ></Svg>
          </van-grid-item>
        </van-grid>
        <!-- 3.5显示晚上气象 -->
        <van-grid
          direction="vertical"
          :column-num="15"
          class="text_day"
          :border="false"
        >
          <van-grid-item
            v-for="item in text_night"
            :text="item"
            key="item.text_night"
          />
        </van-grid>
      </div>
    </div>

    <div v-show="!isShow" style="color: #8c93af; font-size: 18px" class="add">
      <van-icon
        name="add"
        size="50px"
        style="color: #8c93af; padding-bottom: 5px"
        @click="addH(areacode)"
      />
      <p>添加到主页</p>
    </div>
    <div v-show="isShow" class="add">
      <van-icon
        name="browsing-history"
        @click="gohomelist(areacode)"
        size="50"
        style="color: #8c93af; padding-bottom: 5px"
      />
      <p>前往主页查看</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, computed } from "@vue/runtime-core";
import { getWeekWeather } from "@/request/api";
import { WeekWeaInitData } from "@/type/weekWheather";
import router from "@/router";
import * as echarts from "echarts/core";
import {
  GridComponent,
  GridComponentOption,
  MarkLineComponent,
  MarkLineComponentOption,
  MarkPointComponent,
  MarkPointComponentOption,
} from "echarts/components";
import { LineChart, LineSeriesOption } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { useAreaStore } from "@/store/store";
const store = useAreaStore();
echarts.use([
  GridComponent,
  MarkLineComponent,
  MarkPointComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

type EChartsOption = echarts.ComposeOption<
  | GridComponentOption
  | MarkLineComponentOption
  | MarkPointComponentOption
  | LineSeriesOption
>;
var option: EChartsOption;
option = {
  xAxis: {
    type: "category",
    data: [
      "周一",
      "周二",
      "周三",
      "周四",
      "周五",
      "周六",
      "周日",
      "周一",
      "周二",
      "周三",
      "周四",
      "周五",
      "周六",
      "周日",
      "周日",
    ],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [100, 120, 100, 120, 9],
      type: "line",
      smooth: true,
      name: "最高气温",
    },
    {
      data: [75, 76, 59, 59, 60, 66, 69],
      type: "line",
      smooth: true,
      name: "低数",
    },
  ],
};
const props = defineProps({
  days: { type: String, default: " " },
  areacode: { type: String, default: " " },
});
const isShow = computed(() => {
  if (store.$state.areaPosiList.includes(areacode)) {
    return true;
  } else return false;
});
let main = ref();
let areacode = props.areacode;
let time = ref();
let week = ref();
const highList = ref();
const lowList = ref();
const text_day = ref();
const code_day = ref();
const code_night = ref();
const text_night = ref();
const wc_night = ref();
const onClickLeft = () => history.back();
const data = reactive(new WeekWeaInitData());
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

const addH = (data: string) => {
  store.addCityPosition(data);
  console.log(store.$state.areaPosiList);
};
const gohomelist = (data: string) => {
  router.push({
    name: "homelist",
    params: {
      areacode: data,
    },
  });
};

const initCharts = (code: string, days: string) => {
  if (code !== "") {
    getWeekWeather(code, days).then((res) => {
      data.location = res.data.result.location;
      data.daily = res.data.result.daily_fcsts;
      //处理日期时间数据
      time.value = data.daily.map((item) => {
        let datelist = item.date.split("-");
        let daylist = datelist.map((item) => {
          return parseInt(item, 10);
        });
        let date = daylist[1] + "月" + daylist[2] + "日";
        //处理显示今天明天和星期几的数据
        week.value = Array.from(data.daily, ({ week }) => week);
        //把星期几改成周几
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
        //返回年月格式日期
        return date;
      });
      //显示气象
      highList.value = Array.from(data.daily, ({ high }) => high);
      lowList.value = Array.from(data.daily, ({ low }) => low);
      text_day.value = Array.from(data.daily, ({ text_day }) => text_day);
      text_night.value = Array.from(data.daily, ({ text_night }) => text_night);
      wc_night.value = Array.from(data.daily, ({ wc_night }) => wc_night);
      code_day.value = Array.from(data.daily, ({ code_day }) => code_day);
      code_night.value = Array.from(data.daily, ({ code_night }) => code_night);
      let myEchart = echarts.init(main.value);
      myEchart.setOption({
        grid: {
          left: 40,
          top: 30,
          bottom: 15,
          right: 62,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLabel: {
            formatter: function () {
              return "";
            },
            interval: 0,
          },
          dispaly: "none",
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          scale: true,
        },
        yAxis: {
          axisLabel: {
            formatter: function () {
              return "";
            },
          },
          dispaly: "none",
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          scale: true,
          // type: "value",
        },
        series: [
          {
            data: highList.value,
            type: "line",
            name: "最高气温",
            itemStyle: {
              show: true,
              formatter: "{c} °",
            },
            textStyle: {
              color: "#100E0E",
              fontSize: "15",
            },
          },
          {
            data: lowList.value,
            type: "line",
            name: "最低气温",
            itemStyle: {
              label: {
                show: true,
                formatter: "{c} °",
              },
            },
            textStyle: {
              color: "#100E0E",
              fontSize: "15",
            },
          },
        ],
      });
    });
  }
};

onMounted(() => {
  initCharts(areacode, "15");
});
</script>

<style scoped lang="sass">
.half-Weather
  width: 100%
  height: 100%
  .section
    width: 97%
    text-align: left
    margin: 10px 15px
  .hidden
    width: 95%
    height: 63%
    overflow-y: hidden
    .body
      width: 100%
      display: flex
      flex-direction: column
      height: 100%
      overflow: scroll
      margin: 10px 0 20px 0
    // background-color: pink
    :deep(.van-grid)
      flex-wrap: nowrap
    .week
      height: .8rem !important
      :deep(.van-grid-item__content)
        width: 75px
        height: .6rem !important
        .van-grid-item__text
          font-size: 14px
          font-weight: 550
          color: #858585
          line-height: 30
    .time
      height: .65rem
      :deep(.van-grid-item__content)
        width: 75px
        height: .4rem !important
        .van-grid-item__text
          color: #B0B0B0 !important
          font-size: .1rem
    .text_day
      height: 1rem !important
      margin-top: -0.1rem
      :deep(.van-grid-item__content)
        width: 75px
        height: .4rem !important
        .van-grid-item__text
          color: #585857
          font-size: 13px
          font-weight: 550
    .wind
      height: .6rem !important
      margin-buttom: .6rem
      :deep(.van-grid-item__content)
        display: flex
        width: 75px
        height: .4rem !important
        font-size: 11px
        span .icon
          padding-bottom: .06rem
    .day-icon
      margin-top: .06rem
      :deep(.van-grid-item__content)
        width: 75px
        height: 50px
        padding: 0 !important
        .van-grid-item__text
          color: #585857
          font-size: 13px
          font-weight: 550
    .temp
      width: 1150px
  .add
    font-size: 20px
    margin-top: 10px
    color: #8C93AF
</style>