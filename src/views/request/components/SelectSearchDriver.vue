<template>
  <VSearchDropdownVue name="Chọn Lái Xe" :listItems=requestDriverArray placeholder="Tìm lái xe" />
</template>

<script>
import VSearchDropdownVue from "@/components/VSearchDropdown.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { VSearchDropdownVue },
  props: {
    requestDriverArray: {
      type: Array,
    },
  },
});
</script>

<style scoped></style>
