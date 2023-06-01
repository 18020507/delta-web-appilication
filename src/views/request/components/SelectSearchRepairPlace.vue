<template>
  <multiselect
    :options="requestRepairPlaceArray"
    :close-on-select="true"
    :clear-on-select="false"
    placeholder="Lọc nơi sửa"
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
      requestRepairPlaceArray: [
        {
          label: "Bắc Ninh",
          value: "BN",
        },
        {
          label: "Hải Phòng",
          value: "HP",
        },
        {
          label: "Gara đối tác",
          value: "cooperate-shop",
        },
        {
          label: "Cứu hộ",
          value: "emergency",
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
