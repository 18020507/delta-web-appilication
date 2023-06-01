<template>
  <multiselect
    :options="requestDriverArray"
    :close-on-select="true"
    :clear-on-select="false"
    placeholder="Lọc Lái Xe"
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
import { getDriverName } from "@/api/request/request";
import { defineComponent } from "vue";
export default defineComponent({
  components: { Multiselect },
  props: {
    value: {
      type: Map,
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
