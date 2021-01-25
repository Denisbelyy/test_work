import Vue from "vue";
import Vuex from "vuex";
import API from "@/API";
import getFullType from "@/shared/getFullType";

Vue.use(Vuex);

const apiUrl = "https://api.datamuse.com";

export default new Vuex.Store({
  state: {
    favoritesList: []
  },
  getters: {
    filterType: state => {
      const result = [];
      state.favoritesList.forEach(el => {
        const fullType = getFullType(el);
        if (!result.includes(fullType)) {
          result.push(fullType);
        }
      });
      return result;
    }
  },
  mutations: {
    GET_FAVORITE_WORDS(state, wordList) {
      state.favoritesList = wordList;
    },
    UPDATE_FAVORITE_WORD(state, wordList) {
      state.favoritesList = wordList;
    },
    ADD_FAVORITE_WORD(state, word) {
      state.favoritesList.push(word);
    },
    REMOVE_FAVORITE_WORD(state, id) {
      const index = state.favoritesList.findIndex(el => el.score === id);
      state.favoritesList.splice(index, 1);
    }
  },
  actions: {
    addFavoriteWord(context, word) {
      context.commit("ADD_FAVORITE_WORD", word);
    },
    removeFavoriteWord(context, id) {
      context.commit("REMOVE_FAVORITE_WORD", id);
    },
    updateFavoriteWord(context, wordList) {
      context.commit("UPDATE_FAVORITE_WORD", wordList);
    },
    getFavoriteWords(context) {
      const wordList = JSON.parse(localStorage.getItem("favorites"));
      context.commit("GET_FAVORITE_WORDS", wordList);
    },
    getSearch(context, findStr) {
      return API({
        method: "get",
        url: `${apiUrl}/words`,
        params: {
          sp: `${findStr}*`,
          md: `d,r`,
          max: 10
        }
      });
    },
    getWord(context, word) {
      return API({
        method: "get",
        url: `${apiUrl}/words`,
        params: {
          sp: `${word}`,
          md: `d,r`,
          max: 1
        }
      });
    }
  },
  modules: {}
});
