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

      <h1>
        username/build-my-great-website
      </h1>
      <div class="fore">
        <forestv len="3" canvasId="hi" v-bind:plants="garden.availablePlants" v-on:click="pick"></forestv>
        <forestv len="8" canvasId="hello" v-bind:plants="garden.plants" v-on:click="plant"></forestv>
      </div>
      <button v-on:click="grow">GRRRROWWWW!!!</button>
      <button v-on:click="plant">PLANT!!!</button>
      <div style="display: flex; justify-content: space-between; margin-top: 50px;">
        <h1>Pull Requests</h1>
        <githubcontroller v-bind:branchList="branchList"></githubcontroller>
      </div>
      <PullRequestList v-bind:pullRequests="branchList"></PullRequestList>
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
      pickedPlant : [],
      branchList:[
          {
              id: 1,
              branch: "Euicheon-branch",
              name: "",
              isPulled: false,
              isMerged: false,
              src: require("./assets/new.png"),
              status: "new",
              collect_status:"Collect",
              water_status: "Water",
              reward: "Cherry Blossom",
              reward_src: require("./assets/rewards/cherryblossom.png")
          },
          {
              id: 2,
              branch:"Minjoo-branch",
              name:"Fix GitHubController.vue",
              isPulled: false,
              isMerged: false,
              src: require("./assets/new.png"),
              status: "new",
              collect_status:"Collect",
              water_status: "Water",
              reward: "Dottori",
              reward_src:require("./assets/rewards/dottoritree.png")
          }
      ],
      garden: {
        plants: [
          {
            type: "cherry_blossom",
            owner: "samantha",
            level: 0,
            position: { x: 4, y: 4 }
          }
        ],
        availablePlants: [
          {
            type: "cherry_blossom",
            owner: "samantha",
            level: 0,
            position: { x: 0, y: 0 }
          },
          {
            type: "cherry_blossom",
            owner: "samantha",
            level: 0,
            position: { x: 1, y: 2 }
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
    findPlantInPosition(px, py, flag) {
      if (flag==0) return this.garden.plants.find(({ position: { x, y }}) => (x === px) && (y === py));
      else if (flag==1) return this.garden.availablePlants.find(({ position: { x, y }}) => (x === px) && (y === py));
    },
    // blink(plants,pickedPlant) {
    //   var temp=pickedPlant.level;
    //   pickedPlant
    // },
    pick(x, y) {
      if (!this.findPlantInPosition(x, y, 1)) return;
      var flag = 0;
      this.garden.availablePlants.forEach(plant => {
        if (plant.position.x == x && plant.position.y == y) {
          if (!this.pickedPlant.includes(flag)) this.pickedPlant.push(flag);
          // this.blink(this.garden.availablePlants,plant);
          console.log('pick plant'+this.pickedPlant);
          return;
        }
        flag = flag+ 1;
      })
    },
    plant(x, y) {
      console.log(x, y);

      if (this.pickedPlant.length==0 || this.findPlantInPosition(x, y, 0)) return;
      this.garden.plants.push({
        type: "cherry_blossom",
        owner: "samantha",
        level: 0,
        position: { x, y }
      })
      this.garden.availablePlants.splice(this.pickedPlant.pop(),1);
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
  /* width: 30%;
  margin: 0 auto; */
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
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
  #hi {
    border-style: dotted;
  }
</style>
