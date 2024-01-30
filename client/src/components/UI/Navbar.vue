<template>
  <div class="navbar">
    <button class="navbar__btn" @click="$router.push('/')">Главная</button>
    <button class="navbar__btn" @click="$router.push('/posts')">Посты</button>
    <button class="navbar__btn" @click="$router.push('/composition')">
      CompostionApi
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "navbar",
});
</script>
<style scoped>
.navbar {
  height: 50px;
  background-color: teal;
  align-items: center;
  padding: 15px;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  margin-bottom: 50px;
}

.navbar__btn {
  height: 100%;
  padding: 0 10px;
  border: none;
  cursor: pointer;
  background-color: #fff;
  margin-right: 20px;
}
</style>
