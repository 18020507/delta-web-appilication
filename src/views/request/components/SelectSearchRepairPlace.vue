<template>
  <VSearchDropdownVue name="Chọn Nơi Sửa" :listItems="requestRepairPlaceArray" placeholder="Tìm nơi sửa" />
</template>

<script>
import VSearchDropdownVue from "@/components/VSearchDropdown.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { VSearchDropdownVue },
  props: {
    requestRepairPlaceArray: {
      type: Array,
    },
  },
});
</script>

<style scoped></style>
