<template>
  <VDropdown :options="options" @change="handleChange" />
</template>

<script>
import { defineComponent } from "vue";
import VDropdown from "@/components/VDropdown.vue";
export default defineComponent({
  components: { VDropdown },
  data() {
    return {
      options: [
        { label: "Ngày tạo giảm dần", value: "desc" },
        { label: "Ngày tạo tăng dần", value: "asc" },
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
