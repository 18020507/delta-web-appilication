<template>
  <multiselect
    :options="requestRepairPlaceArray"
    :close-on-select="true"
    :clear-on-select="false"
    placeholder="Địa điểm sửa"
    label="label"
    track-by="label"
    :show-labels="false"
    :searchable="false" 
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
