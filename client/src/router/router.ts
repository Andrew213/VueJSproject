import Post from "@/pages/Post.vue";
import Main from "../pages/Main.vue";
import PostsListPage from "../pages/PostsListPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import PostListCompositionApi from "@/pages/PostListCompositionApi.vue";
const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/posts/:id",
    component: Post,
  },
  {
    path: "/posts",
    component: PostsListPage,
  },
  {
    path: "/composition",
    component: PostListCompositionApi,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
