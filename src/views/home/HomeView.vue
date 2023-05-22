<template>
  <div class="container">
    <div class="chart-column">
      <div class="title-chart">Tổng số lượng yêu cầu trong 6 tháng vừa qua</div>
      <div class="chart-wrapper">
        <v-chart class="chart" :option="option" />
      </div>
    </div>
    <div class="chart-column">
      <div class="title-chart">
        Số lượng yêu cầu trong tháng
        <select>
          <option value="">Tháng 1</option>
          <option value="">Tháng 2</option>
          <option value="">Tháng 3</option>
          <option value="">Tháng 4</option>
        </select>
      </div>

      <div class="chart-wrapper">
        <v-chart class="chart" :option="optionChart2" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

export default defineComponent({
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "dark",
  },
  data() {
    return {
      option: {
        title: {
          text: "Tổng số yêu cầu",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "horizontal",
          bottom: "bottom",
          data: ["Yêu Cầu Lái Xe", "Yêu Cầu Xưởng"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "15%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: [
            "Jan",
            "Feb",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Yêu Cầu Lái Xe",
            type: "bar",
            barWidth: 10,
            data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110],
          },
          {
            name: "Yêu Cầu Xưởng",
            type: "bar",
            barWidth: 10,
            data: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
          },
        ],
      },

      optionChart2: {
        title: {
          text: "Chi tiết các loại yêu cầu",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "horizontal",
          bottom: "bottom",
          data: [
            "Yêu cầu Lái Xe",
            "Yêu Cầu Xưởng",
            "Yêu Cầu Hoàn Thành",
            "Yêu Cầu Đang Xử Lý",
            "Yêu Cầu Từ Chối",
            "Yêu Cầu Sửa Tại Gara",
            "Yêu Cầu Sửa Ngoài",
          ],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "15%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Jan"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Yêu cầu Lái Xe",
            type: "bar",
            data: [100],
          },
          {
            name: "Yêu Cầu Xưởng",
            type: "bar",
            data: [20],
          },
          {
            name: "Yêu Cầu Hoàn Thành",
            type: "bar",
            data: [85],
          },
          {
            name: "Yêu Cầu Đang Xử Lý",
            type: "bar",
            data: [10],
          },
          {
            name: "Yêu Cầu Từ Chối",
            type: "bar",
            data: [20],
          },
          {
            name: "Yêu Cầu Sửa Tại Gara",
            type: "bar",
            data: [50],
          },
          {
            name: "Yêu Cầu Sửa Ngoài",
            type: "bar",
            data: [60],
          },
        ],
      },
    };
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  flex: 1;
}

select {
  margin-left: 10px;
}
.chart-column {
  width: 100%;
}

.title-chart {
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.chart-wrapper {
  height: 500px;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
