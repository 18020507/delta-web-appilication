<template>
  <VSearchDropdownVue
    name="Chọn Biển Số"
    :listItems="requestPlateArray"
    placeholder="Tìm biển số"
    @change="handleChange"
    :value="value"
  />
</template>

<script>
import { getLicensePlate } from "@/api/request/request";
import VSearchDropdownVue from "@/components/VSearchDropdown.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { VSearchDropdownVue },
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
      type: String,
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
