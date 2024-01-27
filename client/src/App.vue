<template>
  <h1>Страница постов</h1>
  <my-button class="addBtn" @click="showModal">Создать пост</my-button>
  <my-modal v-model:visible="modalVisible">
    <post-form @create="createPost" />
  </my-modal>
  <post-list :posts="posts" @remove="removePost" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostForm from "./components/PostForm.vue";
import PostList from "@/components/PostList.vue";
interface Post {
  id: number;
  title: string;
  body: string;
}

export default defineComponent({
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [
        {
          id: 1,
          title: "JavaScript",
          body: "lorem bla bvlabl lba",
        },
        {
          id: 2,
          title: "TypeScript",
          body: "lorem bla bvlabl lba",
        },
        {
          id: 3,
          title: "NodeJS",
          body: "lorem bla bvlabl lba",
        },
      ] as Post[],
      modalVisible: false,
    };
  },
  methods: {
    createPost(post: Post) {
      this.posts.push({ ...post });
      this.modalVisible = false;
    },

    removePost(post: Post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },

    showModal() {
      this.modalVisible = true;
    },
  },
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.addBtn {
  margin: 15px 0;
}
</style>
