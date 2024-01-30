<template>
  <h1>Страница постов</h1>
  <my-input v-model="searchQuery" placeholder="Поиск по названию" />

  <div class="controls">
    <my-select v-model="selectedSort" :options="sortOptions" />
  </div>
  <my-modal v-model:visible="modalVisible"> </my-modal>
  <h3 v-if="loading">Загрузка</h3>
  <post-list v-if="!loading" :posts="sortedAndSearchedPost" />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import usePosts from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPost";
import useSortedAndSearchedPost from "../hooks/useSortedAndSearchedPost";
import PostList from "@/components/PostList.vue";
import PostForm from "@/components/PostForm.vue";
export interface Post {
  id: number;
  title: string;
  body: string;
}

export default defineComponent({
  components: {
    PostList,
    PostForm,
  },
  data() {
    return {
      modalVisible: false,
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
  setup(props, ctx) {
    const { posts, loading, totalPages } = usePosts(10);
    console.log(`posts `, posts);
    const { sortedPosts, selectedSort } = useSortedPosts(posts as any);
    const { searchQuery, sortedAndSearchedPost } = useSortedAndSearchedPost(
      sortedPosts as any
    );
    return {
      loading,
      totalPages,
      searchQuery,
      sortedAndSearchedPost,
      selectedSort,
      posts,
    };
    // return usePosts(10, 10);
  },
});
</script>
<style lang=""></style>
