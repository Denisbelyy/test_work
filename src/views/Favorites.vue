<template>
  <div>
    <h1>Starred word</h1>
    <Search mode="favorites" />
  </div>
</template>

<script>
import Search from "../components/Search.vue";
export default {
  components: { Search },
  name: "Favorites"
};
</script>
