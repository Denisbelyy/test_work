<template>
  <div id="app" class="main">
    <div class="main__header">
      <router-link to="/">Word keeper</router-link>
      <router-link to="/favorites" class="fl fl-ac">
        <span style="margin-right: 10px;">Starred word</span>
        <b-icon icon="star-fill" style="width: 20px; height: 20px;"></b-icon>
      </router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    if (localStorage.getItem("favorites")) {
      this.$store.dispatch("getFavoriteWords");
    }
  }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.fl {
  display: flex;
  flex-direction: row;
}
.fl-jc {
  justify-content: center;
}
.fl-ac {
  align-items: center;
}
.main {
  background: #f8f4f4;
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  &__header {
    background: #6ec0fb;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-weight: bold;
    a {
      color: white;
      text-decoration: none;
    }
  }
  .add_favorite {
    cursor: pointer;
  }
}
</style>
