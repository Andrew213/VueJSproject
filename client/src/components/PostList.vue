<template>
  <div v-if="posts.length > 0">
    <h3>Список постов</h3>
    <post
      :post="post"
      v-for="post in posts"
      :key="post.id"
      @remove="$emit('remove', post)"
    />
  </div>
  <h3 v-else>Список пустой</h3>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import Post from "./Post.vue";
interface Post {
  id: number;
  title: string;
  body: string;
}
export default defineComponent({
  components: { Post },
  props: {
    posts: {
      type: Array as PropType<Post[]>,
      required: true,
      default: () => [],
    },
  },
});
</script>

<style scoped></style>
