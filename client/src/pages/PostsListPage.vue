<template>
  <h1>Страница постов</h1>
  <!-- <my-input v-model="searchQuery" placeholder="Поиск по названию" /> -->
  <my-input
    :model-value="searchQuery"
    @update:model-value="setSearchQuery"
    placeholder="Поиск по названию"
  />

  <div class="controls">
    <my-button class="addBtn" @click="showModal">Создать пост</my-button>
    <!-- <my-select v-model="selectedSort" :options="sortOptions" /> -->
    <my-select
      :model-value="selectedSort"
      @update:model-value="setSelectedSort"
      :options="sortOptions"
    />
  </div>
  <my-modal v-model:visible="modalVisible">
    <post-form @create="createPost" />
  </my-modal>
  <h3 v-if="loading">Загрузка</h3>
  <post-list
    v-if="!loading"
    :posts="sortedAndSearchedPost"
    @remove="removePost"
  />
  <div v-intersection="loadMorePosts" v-show="!loading" class="observer"></div>
  <!-- <my-pagination :totalPages="5" :page="page" @page-click="handleCliclPage" /> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import PostList from "@/components/PostList.vue";
import PostForm from "@/components/PostForm.vue";
import { postState } from "@/store/postModule";
import { RootState } from "@/store";
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
      // posts: [] as Post[],
      modalVisible: false,
      // loading: true,
      // selectedSort: "",
      // searchQuery: "",
      // page: 1,
      // limit: 10,
      // totalPage: 0,
      // sortOptions: [
      //   {
      //     value: "title",
      //     name: "По названию",
      //   },
      //   {
      //     value: "body",
      //     name: "По описанию",
      //   },
      // ],
    };
  },
  methods: {
    ...mapMutations({
      setPage: "post/setPage",
      setSearchQuery: "post/setSearchQuery",
      setSelectedSort: "post/setSelectedSort",
    }),
    ...mapActions({
      loadMorePosts: "post/loadMorePosts",
      fetchPosts: "post/fetchPosts",
    }),
    // handleCliclPage(pageNumber: number) {
    //   this.page = pageNumber;
    // },
    createPost(post: Post) {
      this.posts.push({ ...post });
      this.modalVisible = false;
    },

    removePost(post: Post) {
      // this.posts = this.posts.filter((p) => p.id !== post.id);
    },

    showModal() {
      this.modalVisible = true;
    },
    // async loadMorePosts() {
    //   try {
    //     this.page += 1;
    //     setTimeout(async () => {
    //       const response = await axios.get(
    //         "https://jsonplaceholder.typicode.com/posts",
    //         {
    //           params: {
    //             _page: this.page,
    //             _limit: this.limit,
    //           },
    //         }
    //       );

    //       this.totalPage = Math.ceil(
    //         response.headers["x-total-count"] / this.limit
    //       );

    //       this.posts = [...this.posts, ...response.data];
    //     }, 2000);
    //   } catch (error) {
    //     alert("error");
    //   }
    // },
    // async fetchPosts() {
    //   try {
    //     this.loading = true;

    //     setTimeout(async () => {
    //       const response = await axios.get(
    //         "https://jsonplaceholder.typicode.com/posts",
    //         {
    //           params: {
    //             _page: this.page,
    //             _limit: this.limit,
    //           },
    //         }
    //       );

    //       this.totalPage = Math.ceil(
    //         response.headers["x-total-count"] / this.limit
    //       );

    //       this.posts = response.data;
    //       this.loading = false;
    //     }, 2000);
    //   } catch (error) {
    //     alert("error");
    //   }
    // },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: (state: any) => state.post.posts,
      loading: (state: any) => state.post.loading,
      page: (state: any) => state.post.page,
      limit: (state: any) => state.post.limit,
      totalPage: (state: any) => state.post.totalPage,
      sortOptions: (state: any) => state.post.sortOptions,
      selectedSort: (state: any) => state.post.selectedSort,
      searchQuery: (state: any) => state.post.searchQuery,
    }),

    ...mapGetters({
      sortedPosts: "post/sortedPost",
      sortedAndSearchedPost: "post/sortedAndSearchedPost",
    }),
    // sortedPost() {
    //   return [...this.posts].sort((a, b) => {
    //     return a[this.selectedSort]?.localeCompare(b[this.selectedSort]);
    //   });
    // },
    // sortedAndSearchedPost() {
    //   return this.sortedPost.filter((post) =>
    //     post.title.toLowerCase().includes(this.searchQuery.toLocaleLowerCase())
    //   );
    // },
  },
  // watch: {
  //   page() {
  //     this.fetchPosts();
  //   },
  // },
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

.observer {
  height: 30px;
  margin-bottom: 10px;
}
</style>
