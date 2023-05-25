<template>
  <div>
    <h2>Tạo Bàn Giao Xe - Lái Xe</h2>
    <div class="request-form">
      <div class="request-item" v-for="index in multiselectCount" :key="index">
        <b>Chọn Lái Xe:</b>
        <multiselect
          v-model="driverId[index]"
          :options="optionDrivers"
          :close-on-select="true"
          :clear-on-select="false"
          placeholder="Select one"
          label="label"
          track-by="label"
        >
        </multiselect>
      </div>
      <div class="request-item">
        <button @click="addMultiselect">Thêm Lái Xe</button>
      </div>
      <div class="request-item">
        <b>Chọn Xe:</b>
        <multiselect
          v-model="truckId"
          :options="optionTrucks"
          :close-on-select="true"
          :clear-on-select="false"
          placeholder="Select one"
          label="label"
          track-by="label"
        >
        </multiselect>
      </div>
      <div class="request-item">
        <b>Mô Tả:</b>
        <textarea cols="30" rows="10" v-model="description"></textarea>
      </div>
      <div class="button-submit">
        <button @click="handleTruckManagement">Tạo Bàn Giao</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  createTruckManagement,
  getDriverNotRegister,
  getTruckNotRegister,
} from "@/api/truck-management/truckManagement";
import { defineComponent } from "vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";

export default defineComponent({
  components: { Multiselect },
  data() {
    return {
      optionDrivers: [],
      optionTrucks: [],
      driverId: {},
      truckId: {},
      description: "",
      multiselectCount: 1,
    };
  },
  async created() {
    const res_truck = await getTruckNotRegister();
    this.optionTrucks = res_truck.data.data?.map((item) => ({
      label: item.license_plate,
      value: item.id,
    }));
    const res_driver = await getDriverNotRegister();
    this.optionDrivers = res_driver.data.data?.map((item) => ({
      label: item.full_name,
      value: item.id,
    }));
  },
  methods: {
    addMultiselect() {
      this.multiselectCount++;
    },
    async handleTruckManagement() {
      for (const key in this.driverId) {
        const driverId = this.driverId[key];
        const payload = {
          truck_id: this.truckId.value,
          driver_id: driverId.value,
          description: this.description,
        };
        const response = await createTruckManagement(payload);
        if (response.status == 200) {
          this.$emit("createTruckManagement", response.status);
        }
      }
    },
  },
});
</script>

<style scoped>
.request-item {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
}

.request-item b {
  margin-bottom: 10px;
}

.request-item textarea {
  resize: none;
}
.button-submit {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.button-submit button {
  font-weight: bold;
  background-color: lightgreen;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin: auto;
}
</style>
