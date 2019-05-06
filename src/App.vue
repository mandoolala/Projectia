<template>
  <div id="app" class="main">
    <div class="sidebar">
      <div style="padding: 1rem; height: 20rem; color: white;">
        <img style="width: 13rem;" src="./assets/profile.png">
        <div style="margin-top: 1rem">
          <h2>Karl</h2>
          working from home
        </div>
      </div>
      <div style="padding-top: 1rem;">
        <h2 style="color: white; margin: 1rem;">Projects</h2>
        <div style="background-color: #FFFFFF; padding: 1rem; font-size: 1.5rem;">
          build-my-great-...
        </div>
      </div>
    </div>
    <div class="projectContainer">

      <h1>
        username/build-my-great-website
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
  },
  data() {
    return {
      garden: {
        plants: [
          {
            type: "cherry_blossom",
            owner: "samantha",
            level: "grown",
            position: { x: 10, y: 10 }
          }
        ]
      }
    }
  }
};

const plantRepr = {
  "cherry_blossom": {
    tileSource: "../assets/asdf.png",
    levels: [
      {
        terrain: 0,
        tile: 4
      },
      {
        terrain: 0,
        tile: 5
      },
      6,
      7
    ],
  }
}
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
  overflow: hidden;
}

.sidebar {
  background-color: #3c3c3c;
  min-width: 15em;
}

.projectContainer {
  padding: 4rem;
  flex: 1;
  overflow-x: hidden;
  overflow-y: scroll;
}

.fore {
  width: 30%;
  margin: 0 auto
}
</style>
