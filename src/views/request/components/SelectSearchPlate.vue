<template>
  <multiselect
    :options="requestPlateArray"
    :close-on-select="true"
    :clear-on-select="false"
    placeholder="Lọc biển số"
    label="label"
    track-by="label"
    :show-labels="false"
    :model-value="value"
    @update:model-value="handleChange"
  >
  </multiselect>
</template>

<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { getLicensePlate } from "@/api/request/request";
import { defineComponent } from "vue";
export default defineComponent({
  components: { Multiselect },
  async created() {
    const res_license_plate = await getLicensePlate();
    this.requestPlateArray = res_license_plate.data.data?.map((item) => ({
      label: item.truck_license_plate,
      value: item.truck_id,
    }));
  },
  data() {
    return {
      requestPlateArray: [],
    };
  },
  props: {
    value: {
      type: Map,
    },
  },
  methods: {
    handleChange(value) {
      this.$emit("update:value", value);
      this.$emit("change", value);
    },
  },
  emits: ["update:value", "change"],
});
</script>

<style scoped></style>
