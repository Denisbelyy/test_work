<template>
  <div>
    <h1>Word keeper</h1>
    <Search mode="search" />
  </div>
</template>

<script>
import Search from "../components/Search.vue";
export default {
  components: { Search },
  name: "Home"
};
</script>
