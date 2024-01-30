import { Module, StoreOptions } from "vuex";
import axios from "axios";
import { RootState } from "./index";

export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface postState {
  loading: boolean;
  selectedSort: string;
  searchQuery: string;
  page: number;
  limit: number;
  totalPage: number;
  posts: Post[];
  sortOptions: { value: string; name: string }[];
}

const postModule: Module<postState, RootState> = {
  state: () => ({
    posts: [],
    loading: true,
    selectedSort: "",
    searchQuery: "",
    page: 1,
    limit: 10,
    totalPage: 0,
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
  }),
  getters: {
    sortedPost(state) {
      return [...state.posts].sort((a, b) => {
        const prop = state.selectedSort as keyof Post;
        const valueA = a[prop as keyof typeof a];
        const valueB = b[prop as keyof typeof b];
        if (valueA < valueB) {
          return -1;
        }
        if (valueA > valueB) {
          return 1;
        }

        return 0;
      });
    },
    sortedAndSearchedPost(state, getters) {
      return getters.sortedPost.filter((post: Post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLocaleLowerCase())
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, bool) {
      state.loading = bool;
    },
    setPage(state, page) {
      state.page = page;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setTotalPage(state, totalPages) {
      state.totalPage = totalPages;
    },
    setSearchQuery(state, string) {
      state.searchQuery = string;
    },
  },
  actions: {
    async loadMorePosts({ state, commit }) {
      try {
        commit("setPage", (state.page += 1));
        setTimeout(async () => {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
              params: {
                _page: state.page,
                _limit: state.limit,
              },
            }
          );

          commit(
            "setTotalPage",
            Math.ceil(response.headers["x-total-count"] / state.limit)
          );

          commit("setPosts", [...state.posts, ...response.data]);
        }, 2000);
      } catch (error) {
        alert("error");
      }
    },
    async fetchPosts({ state, commit }) {
      try {
        commit("setLoading", true);

        setTimeout(async () => {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
              params: {
                _page: state.page,
                _limit: state.limit,
              },
            }
          );

          commit(
            "setTotalPage",
            Math.ceil(response.headers["x-total-count"] / state.limit)
          );

          commit("setPosts", response.data);

          commit("setLoading", false);
        }, 2000);
      } catch (error) {
        alert("error");
      }
    },
  },
  namespaced: true,
};

export default postModule;
