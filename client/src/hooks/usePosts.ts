import axios from "axios";
import { ref, onMounted } from "vue";

export default function usePosts(limit: number) {
  const posts = ref([]);
  const totalPages = ref(0);
  const loading = ref(true);
  const fetching = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _page: 1,
            _limit: limit,
          },
        }
      );
      totalPages.value = Math.ceil(response.headers["x-total-count"] / limit);
      posts.value = response.data;
    } catch (e) {
      alert("Ошибка");
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetching);

  return {
    posts,
    loading,
    totalPages,
  };
}
