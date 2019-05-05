<template>
  <div id="app">
    <PullRequestList msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import PullRequestList from "./components/PullRequestList.vue";

export default {
  name: "app",
  components: {
    PullRequestList
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
