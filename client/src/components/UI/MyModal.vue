<template>
  <div class="modal" v-if="visible" @click="hideModal">
    <div @click.stop class="modal__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";

export default defineComponent({
  name: "my-modal",
  props: {
    visible: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  methods: {
    hideModal() {
      this.$emit("update:visible", false);
    },
  },
});
</script>

<style scoped>
.modal {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.modal__content {
  margin: auto;
  background-color: white;
  border-radius: 12px;
  padding: 20px;
}
</style>
