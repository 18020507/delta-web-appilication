<template>
  <VSearchDropdownVue
    name="Chọn Trạng Thái"
    :listItems="requestStatusArray"
    placeholder="Tìm trạng thái"
    @change="handleChange"
    :value="value"
  />
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
