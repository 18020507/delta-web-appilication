<template>
  <VSearchDropdownVue name="Chọn ngày" :listItems="requestDateArray" placeholder="Tìm Ngày Tạo" />
</template>

<script>
import VSearchDropdownVue from "@/components/VSearchDropdown.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { VSearchDropdownVue },
  props: {
    requestDateArray: {
      type: Array,
    },
  },
});
</script>

<style scoped></style>
