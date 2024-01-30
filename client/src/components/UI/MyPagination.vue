<script lang="ts">
import { PropType, defineComponent } from "vue";

export default defineComponent({
  name: "my-pagination",
  props: {
    page: {
      type: Number as PropType<number>,
      required: true,
    },
    totalPages: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  methods: {
    handleClick(pageNumber: number) {
      this.$emit("page-click", pageNumber);
    },
  },
});
</script>

<template>
  <div class="pagination">
    <my-button
      class="pagination__btn"
      v-for="pageNumber in totalPages"
      :key="pageNumber"
      :class="{
        pagination__current: pageNumber === page,
      }"
      @click="handleClick(pageNumber)"
    >
      {{ pageNumber }}
    </my-button>
  </div>
</template>

<style scoped>
.pagination {
  margin: 20px;
  /* display: flex;
  justify-content: space-around; */
  align-items: center;
}

.pagination__btn + .pagination__btn {
  margin-left: 20px;
}

.pagination__current {
  border: 1px solid teal;
  background-color: transparent;
  color: teal;
}
</style>
