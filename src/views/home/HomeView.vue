<template>
  <div class="container">
    <div class="chart-column">
      <div class="title-chart">Tổng số lượng yêu cầu trong 6 tháng vừa qua</div>
      <div class="chart-wrapper">
        <v-chart class="chart" :option="option" />
      </div>
    </div>
    <div class="chart-column">
      <div class="title-chart">Số lượng yêu cầu trong tháng</div>

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
import { getStatisticByMonth, getStatisticSummary } from "@/api/home/home";

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
    [THEME_KEY]: "light",
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
            data: [],
          },
          {
            name: "Yêu Cầu Xưởng",
            type: "bar",
            barWidth: 10,
            data: [],
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
            "Yêu Cầu Hoàn Thành",
            "Yêu Cầu Đang Xử Lý",
            "Yêu Cầu Từ Chối",
            "Yêu Cầu Đang Chờ",
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
            name: "Yêu Cầu Hoàn Thành",
            type: "bar",
            barWidth: 30,
            data: [],
          },
          {
            name: "Yêu Cầu Đang Xử Lý",
            type: "bar",
            barWidth: 30,
            data: [],
          },
          {
            name: "Yêu Cầu Từ Chối",
            type: "bar",
            barWidth: 30,
            data: [],
          },
          {
            name: "Yêu Cầu Đang Chờ",
            type: "bar",
            barWidth: 30,
            data: [],
          },
        ],
      },
    };
  },
  methods: {
    async fetchChartData() {
      const response = await getStatisticSummary();
      const data = response.data.data;
      const option = { ...this.option };
      option.series[0].data = Object.values(data).map((item) => item.driver);
      option.series[1].data = Object.values(data).map(
        (item) => item.repair_shop
      );
      this.option = option;

      const currentMonth = new Date().getMonth() + 1;
      const response_by_month = await getStatisticByMonth(currentMonth);

      const statisticData = response_by_month.data.data;
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      const monthName = monthNames[currentMonth - 1];

      const optionChart2 = { ...this.optionChart2 };
      optionChart2.xAxis.data = [monthName];

      optionChart2.series[0].data = [statisticData.finish];
      optionChart2.series[1].data = [statisticData.processing];
      optionChart2.series[2].data = [statisticData.reject];
      optionChart2.series[3].data = [statisticData.pending];
    },
  },
  mounted() {
    this.fetchChartData();
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
