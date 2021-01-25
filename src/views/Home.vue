<template>
  <div>
    <h1>Word keeper</h1>
    <div class="search">
      <div class="search_params">
        <Search @input="onSearch" />
      </div>
      <div class="wordbox">
        <Word
          v-for="(item, index) in listWord"
          :key="index"
          :item="item"
          :show-toggle="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Search from "../components/Search.vue";
import Word from "../components/Word.vue";

export default {
  components: { Search, Word },
  name: "Home",
  data() {
    return {
      listWord: [],
      timer: null
    };
  },
  mounted() {
    this.listWord = JSON.parse(localStorage.getItem("searchList"));
  },
  methods: {
    ...mapActions(["getSearch"]),
    debounce(searchStr) {
      if (this.timer) {
        clearTimeout(this.timer);
        if (searchStr === "") {
          this.listWord = [];
          localStorage.setItem("searchList", JSON.stringify(this.listWord));
          return;
        }
      }
      this.timer = setTimeout(() => {
        this.getSearch(searchStr).then(res => {
          this.listWord = res.sort((a, b) => {
            const wordA = a.word.toLowerCase();
            const wordB = b.word.toLowerCase();
            if (wordA < wordB) {
              return -1;
            }
            if (wordA > wordB) {
              return 1;
            }
            return 0;
          });
          localStorage.setItem("searchList", JSON.stringify(this.listWord));
        });
      }, 500);
    },
    onSearch(event) {
      this.debounce(event.target.value);
    }
  }
};
</script>
