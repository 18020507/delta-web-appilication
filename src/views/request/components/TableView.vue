<template>
  <table>
    <tr class="table-head">
      <th>
        <div class="table-title">Ngày tạo</div>
        <div class="table-filter">
          <SelectSearchDate
            :requestDateArray="uniqueDates"
            v-model:value="form.date"
            @change="handleChange"
          />
        </div>
      </th>
      <th>
        <div class="table-title">Tên Yêu Cầu</div>
      </th>
      <th>
        <div class="table-title">Tên Lái Xe</div>
        <div class="table-filter">
          <SelectSearchDriver
            :requestDriverArray="uniqueDriverNames"
            v-model:value="form.driver"
            @change="handleChange"
          />
        </div>
      </th>
      <th>
        <div class="table-title">Biển Số</div>
        <div class="table-filter">
          <SelectSearchPlate
            :requestPlateArray="uniquePlates"
            v-model:value="form.plate"
            @change="handleChange"
          />
        </div>
      </th>
      <th>
        <div class="table-title">Nơi Sửa</div>
        <div class="table-filter">
          <SelectSearchRepairPlace
            :requestRepairPlaceArray="uniqueRepairPlaces"
            v-model:value="form.repair"
            @change="handleChange"
          />
        </div>
      </th>
      <th>
        <div class="table-title">Trạng Thái</div>
        <div class="table-filter">
          <SelectSearchStatus
            :requestStatusArray="uniqueStatuses"
            v-model:value="form.status"
            @change="handleChange"
          />
        </div>
      </th>
    </tr>
    <tr v-for="item in tableData" :key="item.id">
      <td>{{ item.createdAt }}</td>
      <td>{{ item.requestName }}</td>
      <td>{{ item.driverName }}</td>
      <td>{{ item.truckPlate }}</td>
      <td>{{ item.repairPlace }}</td>
      <td>{{ item.requestStatus }}</td>
    </tr>
  </table>
</template>

<script>
import { defineComponent } from "vue";
import SelectSearchDate from "./SelectSearchDate.vue";
import SelectSearchDriver from "./SelectSearchDriver.vue";
import SelectSearchStatus from "./SelectSearchStatus.vue";
import SelectSearchRepairPlace from "./SelectSearchRepairPlace.vue";
import SelectSearchPlate from "./SelectSearchPlate.vue";
export default defineComponent({
  components: {
    SelectSearchDate,
    SelectSearchDriver,
    SelectSearchStatus,
    SelectSearchRepairPlace,
    SelectSearchPlate,
  },
  props: {
    tableData: Array,
    uniqueDates: Array,
    uniqueDriverNames: Array,
    uniquePlates: Array,
    uniqueRepairPlaces: Array,
    uniqueStatuses: Array,
  },
  data() {
    return {
      form: { date: "", driver: "", plate: "", repair: "", status: "" },
    };
  },
  methods: {
    handleChange() {
      this.$emit("submit", this.form);
    },
  },
  emits: ["submit", "change"],
});
</script>

<style scoped>
table,
th,
td {
  border: 2px solid #b1b1b1;
  border-collapse: collapse;
}

tr {
  height: 38px;
  text-align: center;
  font-weight: bold;
}

table {
  width: 100%;
  table-layout: fixed;
}

select {
  padding: 0px 30px 0px 30px;
  margin: 5px 0px 5px 0px;
}

.table-head {
  background-color: lightgreen;
}

.table-filter {
  margin: 5px;
}

.table-title {
  margin-top: 10px;
}
</style>
