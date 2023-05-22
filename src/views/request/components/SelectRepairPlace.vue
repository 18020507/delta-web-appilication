<template>
  <VDropdownVue
    :options="requestRepairPlaceArray"
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
