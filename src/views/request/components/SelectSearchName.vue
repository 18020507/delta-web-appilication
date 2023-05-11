<template>
  <VSearchDropdownVue name="Chọn Yêu Cầu" :listItems="requestNameArray" placeholder="Tìm tên yêu cầu" />
</template>

<script>
import VSearchDropdownVue from "@/components/VSearchDropdown.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { VSearchDropdownVue },
  props: {
    requestNameArray: {
      type: Array,
    },
  },
});
</script>

<style scoped></style>
