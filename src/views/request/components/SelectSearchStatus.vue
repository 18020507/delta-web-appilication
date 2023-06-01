<template>
  <multiselect
    :options="requestStatusArray"
    :close-on-select="true"
    :clear-on-select="false"
    placeholder="Lọc trạng thái"
    label="label"
    track-by="label"
    :show-labels="false"
    :model-value="value"
    @update:model-value="handleChange"
  >
  </multiselect>
</template>

<script>
import { defineComponent } from "vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
export default defineComponent({
  components: { Multiselect },
  props: {
    value: {
      type: Map,
    },
  },
  data() {
    return {
      requestStatusArray: [
        {
          label: "Chờ xử lý",
          value: "pending",
        },
        {
          label: "Đang xử lý",
          value: "processing",
        },
        {
          label: "Hoàn thành",
          value: "finish",
        },
      ],
    };
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
