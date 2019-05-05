<template>
  <div id="app" class="main">
    <div class="sidebar">
    </div>
    <div class="projectContainer">

      <h1>
        build-my-great-website
      </h1>
      <div class="fore">
        <forestv></forestv>
      </div>
      <h1>
        Pull Requests
      </h1>
      <PullRequestList />
    </div>
  </div>
</template>

<script>
import PullRequestList from "./components/PullRequestList.vue";
import forestv from "./components/Forestv0.vue"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


export default {
  name: "app",
  components: {
    PullRequestList,
    forestv
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.main {
  display: flex;
  width: 100vw;
  height: 100vh;
}

.sidebar {
  background-color: #3c3c3c;
  min-width: 15em;
}

.projectContainer {
  padding: 1rem;
}

.fore {
  width: 30%;
  margin: 0 auto
}
</style>
