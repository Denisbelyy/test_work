<template>
  <div class="details_word">
    <h2>{{ currentWord }}</h2>
    <div v-for="(item, index) in list" :key="index" class="details_word-item">
      <div class="details_word__word">
        <span class="details_word__word-type">
          {{ getFullType(item) }}
        </span>
        <span class="details_word__word-desc">
          {{ getFullDesc(item) }}
        </span>
      </div>
    </div>
    <div v-if="!list">
      Nothing found
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "DetailWord",
  data() {
    return {
      currentWord: "",
      list: []
    };
  },
  mounted() {
    this.currentWord = this.$route.params.word;
    this.getWord(this.currentWord).then(res => {
      this.list = res[0].defs;
    });
  },
  methods: {
    ...mapActions(["getWord"]),
    getFullDesc(item) {
      const [, desc] = item.split("\t");
      return desc;
    },
    getFullType(item) {
      let fullType;
      const [type] = item.split("\t");
      switch (type) {
        case "n":
          fullType = "noun";
          break;
        case "v":
          fullType = "verb";
          break;
        case "adj":
          fullType = "adjective";
          break;
        case "adv":
          fullType = "adverb";
          break;
        default:
          fullType = "unknown";
          break;
      }
      return fullType;
    }
  }
};
</script>
<style lang="scss">
.details_word {
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
    &-type {
      font-style: italic;
      margin-right: 20px;
    }
    &-desc {
      text-align: left;
    }
  }
}
</style>
