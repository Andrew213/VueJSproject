import { ref, computed } from "vue";

export default function useSortedPosts(sortedPosts: any) {
  const searchQuery = ref("");

  const sortedAndSearchedPost = computed(() => {
    return sortedPosts.value.filter((post: any) =>
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  return {
    searchQuery,
    sortedAndSearchedPost,
  };
}
