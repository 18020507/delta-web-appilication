<template>
  <VSearchDropdownVue name="Chọn Biển Số" :listItems="requestPlateArray" placeholder="Tìm biển số" />
</template>

<script>
import VSearchDropdownVue from "@/components/VSearchDropdown.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { VSearchDropdownVue },
  props: {
    requestPlateArray: {
      type: Array,
    },
  },
});
</script>

<style scoped></style>
