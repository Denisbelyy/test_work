<template>
  <div class="wordbox-item">
    <div class="wordbox__word">
      <span v-if="showToggle">
        <b-icon
          icon="justify"
          style="width: 20px; height: 20px;position: relative;top:5px;"
        ></b-icon>
      </span>
      <span class="wordbox__word-title" @click="goToDetailWord(item.word)">
        {{ item.word }}
      </span>
      <span class="wordbox__word-type">
        {{ getFullType(item) }}
      </span>
      <span class="wordbox__word-desc">
        {{ getFullDesc(item) }}
      </span>
    </div>
    <span @click="changeFavoriteList(item)" class="add_favorite">
      <b-icon
        v-if="favoritesList.find(el => el.score === item.score)"
        icon="star-fill"
        style="width: 20px; height: 20px;"
      ></b-icon>
      <b-icon v-else icon="star" style="width: 20px; height: 20px;"></b-icon>
    </span>
  </div>
</template>
<script>
import getFullType from "@/shared/getFullType";
import getFullDesc from "@/shared/getFullDesc";
import { mapActions, mapState } from "vuex";

export default {
  name: "Word",
  props: {
    item: {
      type: Object,
      required: true
    },
    showToggle: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      getFullType,
      getFullDesc
    };
  },
  computed: {
    ...mapState({
      favoritesList: state => state.favoritesList
    })
  },
  methods: {
    ...mapActions(["addFavoriteWord", "removeFavoriteWord"]),
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
    goToDetailWord(word) {
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
