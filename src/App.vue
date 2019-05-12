<template>
  <div id="app" class="main">
    <div class="sidebar">
      <div class="profile">
        <img class="image" src="./assets/user1.png" />
        <div class="title">
          <h2>Karl</h2>
          working from home
        </div>
      </div>
      <div class="project-list">
        <h2 class="title">Projects</h2>
        <div class="item">
          Code-Avengers/Projectia
        </div>
      </div>
    </div>
    <div class="projectContainer">
      <h1>
        Code-Avengers/Projectia
      </h1>
      <plant-book></plant-book>

      <div id="forestcontainer">
        <p class="componenttitle" style="margin-left: 35px;">Members</p>
        <div class="users">
          <div class="username">
            <img class="user" src="./assets/user1.png" />
            <p style="margin-left:35px; margin-top:6px;">Karl</p>
          </div>
          <div class="username">
            <img class="user" src="./assets/user2.png" />
            <p style="margin-left:35px; margin-top:6px;">Lisa</p>
          </div>
          <div class="username">
            <img class="user" src="./assets/user3.png" />
            <p style="margin-left:45px; margin-top:6px;">Bob</p>
          </div>
          <div class="username">
            <img class="user" src="./assets/user4.png" />
            <p style="margin-left:30px; margin-top:6px;">Susan</p>
          </div>
        </div>
        <div class="fore">
          <div style="display:flex; flex-direction: column; ">
            <div>
              <p class="componenttitle" style="margin-left: 30px;">Seed-Box</p>
              <forestv
                class="forestv"
                len="3"
                :plants="garden.availablePlants"
                @click="pick"
              ></forestv>
            </div>
          </div>
          <img style="width:100px;" src="./assets/bigarrow.png" />
          <div>
            <div
              style="display:flex; flex-direction:row; justify-content: space-between;"
            >
              <p
                class="componenttitle"
                style="margin-left: 35px; margin-top: 25px;"
              >
                Garden
              </p>
              <button id="plantbook" @click="$bvModal.show('plant-book')">
                <img
                  style="width:50px; margin-bottom: 5px;"
                  src="./assets/plantbook.png"
                />
                Plant Book
              </button>
            </div>
            <forestv
              class="forestv"
              len="8"
              :plants="garden.plants"
              @click="plant"
            ></forestv>
          </div>
        </div>
      </div>
      <div>
        <div
          style="display: flex; justify-content: flex-start; margin-top: 30px; margin-left:20px;"
        >
          <h1>Pull Requests</h1>
          <githubcontroller v-bind:branchList="branchList"></githubcontroller>
        </div>
        <PullRequestList
          v-on:grow="grow"
          v-on:addPlant="addSeedToBox"
          v-bind:pullRequests="branchList"
        ></PullRequestList>
      </div>
    </div>
  </div>
</template>

<script>
import PullRequestList from "./components/PullRequestList.vue";
import githubcontroller from "./components/GithubController";
import forestv from "./components/Forestv0.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { getMaxLevel } from "./plants";
import PlantBook from "./components/PlantBook";
import { defaultBranches } from "./constants";

export default {
  name: "app",
  components: {
    PlantBook,
    PullRequestList,
    forestv,
    githubcontroller
  },
  data() {
    return {
      pickedPlant: [],
      branchList: defaultBranches,
      garden: {
        plants: [],
        availablePlants: [
          {
            type: "flower",
            owner: "samantha",
            level: 0,
            position: { x: 0, y: 0 }
          },
          {
            type: "flower",
            owner: "samantha",
            level: 0,
            position: { x: 1, y: 0 }
          },
        ]
      }
    };
  },
  methods: {
    grow() {
      // this.watering = true;
      this.garden.plants = this.garden.plants.map(plant => {
        return {
          ...plant,
          // lvl <= max
          level: Math.min(plant.level + 1, getMaxLevel(plant.type))
        };
      });
    },
    findPlantInPosition(px, py, flag) {
      if (flag == 0)
        return this.garden.plants.find(
          ({ position: { x, y } }) => x === px && y === py
        );
      else if (flag == 1)
        return this.garden.availablePlants.find(
          ({ position: { x, y } }) => x === px && y === py
        );
    },
    addSeedToBox(type) {
      // this.watering = false;
      const plantList = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]);
      this.garden.availablePlants.forEach(plant => {
        plantList.delete(plant.position.y * 3 + plant.position.x);
      });
      if (plantList.size == 0) alert("으아악...");
      var pos = [...plantList.values()][0];
      this.garden.availablePlants.push({
        type: type,
        owner: "samantha",
        level: 0,
        position: { x: pos % 3, y: Math.floor(pos / 3) }
      });
    },
    pick(x, y) {
      if (!this.findPlantInPosition(x, y, 1)) return;
      var flag = 0;
      this.garden.availablePlants.forEach(plant => {
        if (plant.position.x == x && plant.position.y == y) {
          if (!this.pickedPlant.includes(flag)) {
            this.pickedPlant.push(plant);
            var item = this.garden.availablePlants.splice(flag, 1)[0];
            item.level = 1;
            this.garden.availablePlants.splice(flag, 0, item);
            //console.log('pick plant'+this.garden.availablePlants);
            return;
          }
        }
        flag = flag + 1;
      });
    },
    plant(x, y) {
      console.log(x, y);
      if (this.pickedPlant.length == 0 || this.findPlantInPosition(x, y, 0))
        return;
      var item = this.pickedPlant.pop();
      var flag = 0;
      console.log(item);
      this.garden.availablePlants.forEach(plant => {
        if (
          plant.position.x == item.position.x &&
          plant.position.y == item.position.y
        ) {
          this.garden.availablePlants.splice(flag, 1);
        }
        flag = flag + 1;
      });
      item.level = 2;
      item.position = { x, y };
      this.garden.plants.push(item);
    }
  },
  mounted: function() {
    this.$tours["myTour"].start();
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Press+Start+2P|Roboto|Oxygen:700|Open+Sans:600");

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

h1 {
  font-family: "Open Sans", sans-serif;
  margin-bottom: 20px;
}

#forestcontainer {
  background-color: #ebebeb;
  padding-top: 30px;
  width: 900px;
}

.componenttitle {
  font-size: 25px;
  font-family: "Press Start 2P", cursive;
  color: black;
}

.users {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 50px;
  margin-right: 50px;
}

.user {
  height: 140px;
  border-color: black;
  border-width: thick;
}

.username {
  flex-direction: column;
  justify-content: center;
  font-family: "Press Start 2P", cursive;
  margin-bottom: 25px;
}

.fore {
  /* width: 30%;
  margin: 0 auto; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: green;
  font-size: 100px;
}

#plantbook {
  font-size: 18px;
  font-family: "Press Start 2P", cursive;
  color: white;
  background-color: green;
  margin-right: 35px;
  margin-top: 10px;
  padding-top: 5px;
  padding-right: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.forestv {
  margin-right: 30px;
  margin-left: 30px;
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
  color: white;
  margin: 1rem;
}

.project-list .item {
  background-color: #ffffff;
  padding: 1rem;
  font-size: 1.2rem;
}
</style>
