<template>
  <VSearchDropdownVue name="Chọn Trạng Thái" :listItems="requestStatusArray" placeholder="Tìm trạng thái" />
</template>

<script>
import VSearchDropdownVue from "@/components/VSearchDropdown.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { VSearchDropdownVue },
  props: {
    requestStatusArray: {
      type: Array,
    },
  },
});
</script>

<style scoped></style>
