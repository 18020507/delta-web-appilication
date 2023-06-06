<template>
  <multiselect
    :options="requestRequestPlaceArray"
    :close-on-select="true"
    :clear-on-select="false"
    placeholder="Mức độ"
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
      requestRequestPlaceArray: [
        {
          label: "Cao",
          value: "high",
        },
        {
          label: "Thấp",
          value: "low",
        },
      ],
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
