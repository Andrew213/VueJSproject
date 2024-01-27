<template>
  <h1>Страница постов</h1>
  <div class="controls">
    <my-button class="addBtn" @click="showModal">Создать пост</my-button>
    <my-select v-model="selectedSort" :options="sortOptions" />
  </div>
  <my-modal v-model:visible="modalVisible">
    <post-form @create="createPost" />
  </my-modal>
  <h3 v-if="loading">Загрузка</h3>
  <post-list v-if="!loading" :posts="sortedPost" @remove="removePost" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostForm from "./components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import axios from "axios";

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
      posts: [] as Post[],
      modalVisible: false,
      loading: false,
      selectedSort: "",
      sortOptions: [
        {
          value: "title",
          name: "По названию",
        },
        {
          value: "body",
          name: "По описанию",
        },
      ],
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
    async fetchPosts() {
      try {
        this.loading = true;

        setTimeout(async () => {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts?_limit=10"
          );

          this.posts = response.data;
          this.loading = false;
        }, 2000);
      } catch (error) {
        alert("error");
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPost() {
      return [...this.posts].sort((a, b) => {
        return a[this.selectedSort]?.localeCompare(b[this.selectedSort]);
      });
    },
  },
  // watch: {
  //   selectedSort(newValue: string) {
  //     this.posts.sort((a, b) => {
  //       return a[newValue]?.localeCompare(b[newValue]);
  //     });
  //   },
  // },
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.addBtn {
  margin-right: 20px;
}

.controls {
  display: flex;
  margin: 15px 0;
}
</style>
