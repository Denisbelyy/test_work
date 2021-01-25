<template>
  <div class="search">
    <div class="search_params">
      <input
        v-model="search"
        @input="onSearch"
        class="search_input"
        placeholder="search..."
      />
      <div
        v-for="(type, index) in filterType"
        :key="index"
        class="search_filter"
      >
        <input
          v-model="types[type]"
          @change="filter"
          type="checkbox"
          class="search_checkbox"
          :id="`checkbox-${index}`"
        />
        <label :for="`checkbox-${index}`">
          {{ type }}
        </label>
      </div>
    </div>
    <div class="wordbox">
      <draggable v-model="favoritesList" v-if="mode === 'favorites'">
        <Word v-for="(item, index) in listWord" :key="index" :item="item" />
      </draggable>
      <div v-else>
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
import getFullType from "@/shared/getFullType";
import { mapActions, mapGetters } from "vuex";
import Word from "./Word";
import draggable from "vuedraggable";

export default {
  name: "Search",
  props: {
    mode: {
      type: String,
      required: true,
      default: "search"
    }
  },
  components: {
    draggable,
    Word
  },
  data() {
    return {
      search: "",
      listWord: [],
      types: {
        noun: false,
        verb: false,
        adjective: false,
        adverb: false,
        unknown: false
      },
      timer: null
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
      let result = false;
      Object.keys(this.types).forEach(key => {
        if (this.types[key]) {
          result = true;
        }
      });
      return result;
    }
  },
  mounted() {
    if (this.mode === "search") {
      this.listWord = JSON.parse(localStorage.getItem("searchList"));
      this.search = localStorage.getItem("searchWord");
    }
    if (this.mode === "favorites") {
      this.listWord = this.favoritesList;
    }
  },
  methods: {
    ...mapActions(["getSearch", "addFavoriteWord", "removeFavoriteWord"]),
    onSearch() {
      if (this.mode === "search") {
        this.debounce();
      } else if (this.mode === "favorites") {
        this.searchByFavorites();
      }
      localStorage.setItem("searchWord", this.search);
    },
    debounce() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        if (this.search) {
          this.getSearch(this.search).then(res => {
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
        }
      }, 500);
    },
    searchByFavorites() {
      this.listWord = [];
      this.favoritesList.forEach(el => {
        if (this.isFiltered) {
          const currentType = getFullType(el);
          if (el.word.indexOf(this.search) === 0 && this.types[currentType]) {
            this.listWord.push(el);
          }
        } else {
          if (el.word.indexOf(this.search) === 0) {
            this.listWord.push(el);
          }
        }
      });
    },
    filter() {
      if (this.isFiltered) {
        const keys = Object.keys(this.types);
        let result = [];
        keys.forEach(key => {
          if (this.types[key]) {
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
        this.searchByFavorites();
      }
    },
    updateList(value) {
      this.$store.dispatch("updateFavoriteWord", value);
      this.listWord = value;
      localStorage.setItem("favorites", JSON.stringify(this.favoritesList));
    },
    changeFavoriteList(word) {
      const isFavorite = this.favoritesList.find(
        item => item.score === word.score
      );
      if (isFavorite) {
        this.removeFavoriteWord(word.score);
      } else {
        this.addFavoriteWord(word);
      }
      localStorage.setItem("favorites", JSON.stringify(this.favoritesList));
    },
    getFullDesc(item) {
      if (!item.defs) {
        return "";
      }
      const [, desc] = item?.defs[0].split("\t");
      return desc;
    },
    getWord(word) {
      this.$router.push({
        name: "DetailWord",
        params: {
          word
        }
      });
    }
  }
};
</script>
<style lang="scss">
.search {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 0;
  &_params {
    width: 300px;
    background: #efefef;
    text-align: left;
  }
  &_input {
    border: 1px solid #c1e2fa;
    border-radius: 10px;
    padding: 10px 20px;
    box-sizing: border-box;
    font-size: 16px;
    outline: none;
    width: 100%;
    &:focus {
      border: 1px solid #a6d6f8;
    }
  }
  &_filter {
    padding: 5px 0;
  }
  &_checkbox {
    position: absolute;
    z-index: -1;
    opacity: 0;
    & + label {
      display: inline-flex;
      align-items: center;
      user-select: none;
      &:before {
        content: "";
        display: inline-block;
        width: 1em;
        height: 1em;
        flex-shrink: 0;
        flex-grow: 0;
        border: 1px solid #adb5bd;
        border-radius: 0.25em;
        margin-right: 0.5em;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 50% 50%;
      }
    }
    &:checked {
      & + label {
        &:before {
          border-color: #0b76ef;
          background-color: #0b76ef;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
        }
      }
    }
    &:not(:disabled):active + label:before {
      background-color: #b3d7ff;
      border-color: #b3d7ff;
    }
    &:focus + label:before {
      border-color: #b3d7ff;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
    &:focus:not(:checked) + label:before {
      border-color: #80bdff;
    }
  }
}
.wordbox {
  width: calc(100% - 320px);
  &-item {
    background: #fff;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0px 0px 10px;
  }
  &__word {
    display: flex;
    justify-content: space-between;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    &-title {
      font-weight: bold;
      margin-right: 10px;
      cursor: pointer;
    }
    &-type {
      font-style: italic;
      margin-right: 10px;
    }
  }
}
</style>
