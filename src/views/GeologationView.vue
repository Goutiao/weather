<template>
  <div class="geologation">
    <!-- 搜索城市部分 -->
    <div class="part-one">
      <van-search v-model="input" shape="round" @search="citySearch" />
      <span @click="back">取消</span>
    </div>
    <!-- 热门城市部分 -->
    <div class="part-two" v-if="isShow">
      <p>热门城市</p>
      <div class="popularCity">
        <van-row gutter="20" justify="space-around">
          <van-col span="7">
            <div class="location" @click="getLoca">
              定位
              <van-icon name="location-o" />
            </div>
          </van-col>
          <van-col
            span="7"
            v-for="item in hotCityList"
            @click="goWeeks(item.areacode)"
          >
            {{ item.name }}</van-col
          >
        </van-row>
      </div>
    </div>
    <!-- 显示搜索城市的天气 -->
    <SearchResult
      :areaList="data.areaList"
      v-if="store.$state.isShowSearch"
    ></SearchResult>
  </div>
</template>
  
<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, reactive, onMounted } from "vue";
//导入地址类型接口类实例
import { cityGeoInitData } from "@/type/cityGeo";
//导入数据接口函数
import { getCityGeo, getIp } from "@/request/api";
import SearchResult from "../components/SearchResult.vue";
import { useAreaStore } from "@/store/store";

const store = useAreaStore();
const data = reactive(new cityGeoInitData());
const router = useRouter();
const input = ref("");
const back = ref();

let isShow = ref(true);
const goWeeks = (data: string) => {
  router.push({
    name: "weeks",
    params: {
      areacode: data,
      days: "15",
    },
  });
};
//获取定位
let city = ref();
let locate = ref();
const getLoca = () => {
  let ip = (window as any).returnCitySN.cip;
  getIp(ip).then((res) => {
    city.value = res.data.data.city.slice(0, 2);
    getCityGeo(city.value).then((res) => {
      locate.value = res.data.areaList[0].areacode;
      store.initAreaPosition(locate.value);
      goWeeks(locate.value);
    });
  });
};

//输入框输入内容显示查询的结果
const citySearch = (input: string) => {
  //把搜索的内容作为参数传给 搜索城市api调用数据
  if (input !== " ") {
    getCityGeo(input).then((res) => {
      // console.log(res.data.areaList);
      data.areaList = res.data.areaList;
      //console.log(data.areaList);
      isShow.value = !isShow.value;
      store.isShow();
    });
    //搜索后切换组件，显示搜索的内容
  }
};
//接口没有热门城市的数据，不想mock，就直接写死渲染了，之后有时间改
const hotCityList = [
  {
    name: "北京市",
    areacode: "101010100",
  },
  {
    name: "上海市",
    areacode: "101020100",
  },
  {
    name: "深圳市",
    areacode: "101280601",
  },
  {
    name: "成都市",
    areacode: "101270101",
  },
  {
    name: "杭州市",
    areacode: "101210101",
  },
  {
    name: "长沙市",
    areacode: "101250101",
  },
  {
    name: "广州市",
    areacode: "101280101",
  },
  {
    name: "武汉市",
    areacode: "101200101",
  },
  {
    name: "天津市",
    areacode: "101030100",
  },
  {
    name: "太原市",
    areacode: "101100101",
  },
  {
    name: "沈阳市",
    areacode: "101070101",
  },
  {
    name: "长春市",
    areacode: "101060101",
  },
  {
    name: "南京市",
    areacode: "101190101",
  },
  {
    name: "合肥市",
    areacode: "101220101",
  },
  {
    name: "福州市",
    areacode: "101230101",
  },
  {
    name: "南昌市",
    areacode: "101240101",
  },
  {
    name: "济南市",
    areacode: "101120101",
  },
];
back.value = function () {
  store.disapear();
  router.go(-1);
};
</script>

<style scoped lang="sass">
.geologation
  width: 100%
  display: flex
  flex-direction: column
  .part-one
    display: flex
    justify-content: space-around
    margin-top: .6rem
    :deep(.van-search)
      width: 78%
      height: 40px
      border-radius: .7rem !important
      background-color: #F7F8FA
    span
      font-size: 16px
      text-align: center
      line-height: 1.1rem
      font-weight: 650
      color: #629DF9
      margin-right: .2rem
  .part-two
    margin: 20px 15px 0 15px
    text-align: left
    font-size: 14px
    color: #B9B9BB
    margin-bottom: .4rem
.van-row
  .van-col--7
    width: 30%
    height: 36px
    line-height: 36px
    text-align: center
    border-radius: 19px
    background-color: #F5F5F5
    font-size: .38rem
    margin-top: .4rem
    padding: 0 !important
    .location
      display: flex
      flex-wrap: wrap
      justify-content: center
      align-items: center
      color: #629DF9
</style>