<template>
  <div id="app" class="main">
    <div class="sidebar">
      <div class="profile">
        <img class="image" src="./assets/profile.png">
        <div class="title">
          <h2>Karl</h2>
          working from home
        </div>
      </div>
      <div class="project-list">
        <h2 class="title">Projects</h2>
        <div class="item">
          build-my-great-...
        </div>
      </div>
    </div>
    <div class="projectContainer">
        <githubcontroller></githubcontroller>
      <h1>
        username/build-my-great-website
      </h1>
      <div class="fore">
        <forestv v-bind:plants="garden.plants" v-on:click="plant"></forestv>
      </div>
      <button v-on:click="grow">GRRRROWWWW!!!</button>
      <button v-on:click="plant">PLANT!!!</button>
      <h1>
        Pull Requests
      </h1>
      <PullRequestList></PullRequestList>
    </div>

  </div>
</template>

<script>
import PullRequestList from "./components/PullRequestList.vue";
import githubcontroller from "./components/GithubController";
import forestv from "./components/Forestv0.vue"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {getMaxLevel} from "./plants";


export default {
  name: "app",
  components: {
    PullRequestList,
    forestv,
    githubcontroller
  },
  data() {
    return {
      showModal : false,
      garden: {
        plants: [
          {
            type: "cherry_blossom",
            owner: "samantha",
            level: 0,
            position: { x: 4, y: 4 }
          }
        ]
      }
    }
  },
  methods: {
    grow() {
      this.garden.plants = this.garden.plants.map(plant => {
        return {
          ...plant,
          // lvl <= max
          level: Math.min(plant.level + 1, getMaxLevel(plant.type))
        }
      });
    },
    findPlantInPosition(px, py) {
      return this.garden.plants.find(({ position: { x, y }}) => (x === px) && (y === py));
    },
    plant(x, y) {
      console.log(x, y);
      if (this.findPlantInPosition(x, y)) return;

      this.garden.plants.push({
        type: "cherry_blossom",
        owner: "samantha",
        level: 0,
        position: { x, y }
      })
    }
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

.profile {
    padding: 1rem;
    height: 20rem;
    color: white;
}
  .profile .image {
    width: 13rem;
  }
  .profile .title {
    margin-top: 1rem;
  }

  .project-list {
    padding-top: 1rem;
  }

  .project-list .title {
    color: white; margin: 1rem;
  }

  .project-list .item {
    background-color: #FFFFFF; padding: 1rem; font-size: 1.5rem;
  }
</style>
