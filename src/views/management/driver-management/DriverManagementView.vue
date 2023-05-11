<template>
  <div class="container">
    <div class="title">
      <h2>Danh sách Lái Xe</h2>
    </div>
    <div class="table">
      <DriverTable :tableData="listDriver" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import DriverTable from "./components/DriverTable.vue";
export default defineComponent({
  components: { DriverTable },
  data() {
    return {
      listDriver: [
        {
          driverName: "Nguyễn Văn A",
          driverAge: "abc",
          driverHometown: "abc",
          driverIdCitizen: "abc",
          driverStatus: "abc",
          driverNote: "None",
        },
      ],
    };
  },
});
</script>

<style scoped>
.container {
  margin-left: 30px;
  margin-top: 20px;
  margin-right: 50px;
  flex: 1;
}
</style>
