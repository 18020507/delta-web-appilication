<template>
  <div class="container">
    <div class="title">
      <h2>Đăng kiểm xe</h2>
    </div>
    <div class="table">
      <TruckRegistrationTable :tableData="listTruckRegistration" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import TruckRegistrationTable from "./components/TruckRegistrationTable.vue";

export default defineComponent({
  components: { TruckRegistrationTable },
  data() {
    return {
      listTruckRegistration: [
        {
          truckType: "15R-09613",
          truckLisence: "abc",
          truckPlate: "abc",
          registrationDate: "abc",
          nextRegistrationDate: "abc",
          dayLeft: "abc",
          note: "abc",
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
