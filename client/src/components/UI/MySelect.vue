<script lang="ts">
import { PropType, defineComponent } from "vue";

export default defineComponent({
  name: "my-select",
  props: {
    modelValue: {
      type: String as PropType<string>,
    },
    options: {
      type: Array as PropType<{ value: string; name: string }[]>,
      default: () => [],
    },
  },
  methods: {
    changeOption(e: Event) {
      this.$emit("update:modelValue", (e.target as HTMLSelectElement).value);
    },
  },
});
</script>

<template>
  <select v-model="modelValue" @change="changeOption">
    <option disabled value="">Выберите из списка</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<style scoped></style>
