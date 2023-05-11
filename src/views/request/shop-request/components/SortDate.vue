<template>
  <VDropdown :options="options" />
</template>

<script>
import { defineComponent } from "vue";
import VDropdown from "@/components/VDropdown.vue";
export default defineComponent({
  components: { VDropdown },
  data() {
    return {
      options: [
        { label: "Ngày tạo giảm dần", value: "date-descending" },
        { label: "Ngày tạo tăng dần", value: "date-ascending" },
      ],
    };
  },
});
</script>

<style scoped></style>
