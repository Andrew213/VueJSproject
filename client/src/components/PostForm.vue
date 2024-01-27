<template>
  <form class="form" @submit.prevent>
    <h4>Создание поста</h4>
    <my-input v-model="post.title" placeholder="Название" />

    <div style="margin-top: 15px; margin-bottom: 15px">
      <my-input v-model="post.body" placeholder="Описание" />

      <!-- <input
        :value="post.body"
        @input="post.body = ($event.target as HTMLInputElement).value"
        class="input"
        type="text"
        placeholder="Описание"
      /> -->
    </div>

    <my-button @click="createPost" class="button">Сохранить</my-button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
interface Post {
  id: number;
  title: string;
  body: string;
}

export default defineComponent({
  data() {
    return {
      post: {
        title: "",
        body: "",
        id: 0,
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
      // this.posts.push(newPost);
      this.post.title = "";
      this.post.body = "";
    },
  },
});
</script>

<style scoped>
.form {
  margin: 15px 0;
  display: flex;
  flex-direction: column;
}
</style>
