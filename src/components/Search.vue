<template>
  <input
    v-model="search"
    class="search_input"
    placeholder="search..."
    @input="onSearch"
  />
</template>
<script>
export default {
  name: "Search",
  data() {
    return {
      search: "",
      listWord: [],
      timer: null
    };
  },
  methods: {
    onSearch(event) {
      console.log(event);
      this.$emit("input", event);
      localStorage.setItem("searchWord", this.search);
    }
  }
};
</script>
