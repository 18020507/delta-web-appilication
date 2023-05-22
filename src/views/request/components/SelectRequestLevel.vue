<template>
  <VDropdownVue
    :options="requestRequestPlaceArray"
    @change="handleChange"
    :value="value"
  />
</template>

<script>
import { defineComponent } from "vue";
import VDropdownVue from "@/components/VDropdown.vue";
export default defineComponent({
  components: { VDropdownVue },
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
