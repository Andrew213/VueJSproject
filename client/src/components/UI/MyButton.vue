<template>
  <button class="button"><slot></slot></button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "my-button",
});
</script>

<style scoped>
.button {
  padding: 10px 15px;
  color: #fff;
  background-color: teal;
  border-radius: 6px;
  cursor: pointer;
  align-self: center;
  border: 1px solid transparent;
  &:hover {
    background-color: transparent;
    color: teal;
    border: 1px solid teal;
  }
}
</style>
