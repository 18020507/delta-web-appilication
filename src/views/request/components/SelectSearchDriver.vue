<template>
  <VSearchDropdownVue
    name="Chọn Lái Xe"
    :listItems="requestDriverArray"
    placeholder="Tìm lái xe"
    @change="handleChange"
    :value="value"
  />
</template>

<script>
import { getDriverName } from "@/api/request/request";
import VSearchDropdownVue from "@/components/VSearchDropdown.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { VSearchDropdownVue },
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      requestDriverArray: [],
    };
  },
  methods: {
    async handleFetch() {
      const res_driver_name = await getDriverName();
      this.requestDriverArray = res_driver_name.data.data?.map((item) => ({
        label: item.driver_name,
        value: item.driver_id,
      }));
    },
    handleChange(value) {
      this.$emit("update:value", value);
      this.$emit("change", value);
    },
  },
  async mounted() {
    await this.handleFetch();
  },
  emits: ["update:value", "change"],
});
</script>

<style scoped></style>
