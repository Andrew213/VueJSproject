<template>
  <div class="post">
    <div>
      {{ post.id }}
      <div>Лайки - {{ $store.state.likes }}</div>
      <div><strong>Название:</strong>{{ post.title }}</div>
      <div><strong>Описание:</strong>{{ post.body }}</div>
    </div>
    <div class="post__btns">
      <my-button @click="$router.push(`/posts/${post.id}`)">Открыть</my-button>
      <my-button @click="$emit('remove', post)">Удалить</my-button>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
interface Post {
  id: number;
  title: string;
  body: string;
}
export default defineComponent({
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  },
});
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & + & {
    margin-top: 15px;
  }
}

.post__btns button:first-of-type {
  margin-right: 10px;
}
</style>
