
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
  grid: {
    left: "9%",
    right: "4%",
    bottom: "3%",
    containLabel: false,
  },
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
      data: [
        100, 120, 100, 120, 90, 80, 110, 100, 120, 100, 120, 90, 80, 110, 200,
      ],
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
export default{echarts,option};
