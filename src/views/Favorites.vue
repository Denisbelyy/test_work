<template>
  <div>
    <h1>Starred word</h1>
    <div class="search">
      <div class="search_params">
        <Search @input="onSearch" />
        <div
          v-for="(type, index) in filterType"
          :key="index"
          class="search_filter"
        >
          <input
            v-model="filters[type]"
            type="checkbox"
            class="search_checkbox"
            :id="`checkbox-${index}`"
            @change="filter"
          />
          <label :for="`checkbox-${index}`">
            {{ type }}
          </label>
        </div>
      </div>
      <div class="wordbox">
        <Draggable v-model="favoritesList">
          <Word v-for="(item, index) in listWord" :key="index" :item="item" />
        </Draggable>
      </div>
    </div>
  </div>
</template>

<script>
import getFullType from "@/shared/getFullType";
import Search from "../components/Search.vue";
import Word from "../components/Word.vue";
import Draggable from "vuedraggable";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { Search, Word, Draggable },
  name: "Favorites",
  data() {
    return {
      listWord: [],
      filters: {
        noun: false,
        verb: false,
        adjective: false,
        adverb: false,
        unknown: false
      }
    };
  },
  computed: {
    ...mapGetters(["filterType"]),
    favoritesList: {
      get() {
        return this.$store.state.favoritesList;
      },
      set(value) {
        this.updateList(value);
      }
    },
    isFiltered() {
      return Object.keys(this.filters).some(key => this.filters[key]);
    }
  },
  mounted() {
    this.listWord = this.favoritesList;
  },
  methods: {
    ...mapActions([
      "addFavoriteWord",
      "removeFavoriteWord",
      "updateFavoriteWord"
    ]),
    onSearch(event) {
      this.searchByFavorites(event.target.value);
    },
    searchByFavorites(searchStr) {
      this.listWord = [];
      this.favoritesList.forEach(el => {
        if (this.isFiltered) {
          const currentType = getFullType(el);
          if (el.word.indexOf(searchStr) === 0 && this.filters[currentType]) {
            this.listWord.push(el);
          }
        } else {
          if (el.word.indexOf(searchStr) === 0) {
            this.listWord.push(el);
          }
        }
      });
    },
    filter() {
      if (this.isFiltered) {
        const keys = Object.keys(this.filters);
        let result = [];
        keys.forEach(key => {
          if (this.filters[key]) {
            this.favoritesList.forEach(el => {
              const currentWord = getFullType(el);
              if (currentWord == key) {
                result.push(el);
              }
            });
          }
        });
        this.listWord = result;
      } else {
        this.searchByFavorites("");
      }
    },
    updateList(value) {
      this.updateFavoriteWord(value);
      this.listWord = value;
      localStorage.setItem("favorites", JSON.stringify(this.favoritesList));
    }
  }
};
</script>
