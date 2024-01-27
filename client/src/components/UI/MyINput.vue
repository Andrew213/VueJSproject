<template>
  <input :value="modelValue" @input="updateInput" type="text" class="input" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "my-input",
  props: {
    modelValue: {
      type: [String, Number],
    },
  },
  methods: {
    updateInput(e: Event) {
      this.$emit("update:modelValue", (e.target as HTMLInputElement).value);
    },
  },
});
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
}
</style>
