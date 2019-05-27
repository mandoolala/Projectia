<template>
  <div id="app" class="main">
    <div class="sidebar">
      <div class="profile">
        <img class="image" src="./assets/user1.png">
        <div class="title">
          <h2>Karl</h2>working from home
        </div>
      </div>
      <div class="project-list">
        <h2 class="title">Projects</h2>
        <div class="item">Code-Avengers/Projectia</div>
      </div>
    </div>
    <div class="projectContainer">
      <h1>Code-Avengers/Projectia</h1>
      <plant-book></plant-book>
      <Tutorial></Tutorial>
      <div id="forestcontainer">
        <div class="fore">
          <div style="display:flex; flex-direction: column; ">
            <div>
              <p class="componenttitle" style="margin-left: 30px;">Seed-Box</p>
              <forestv
                class="forestv"
                len="3"
                :plants="garden.availablePlants"
                @click="pick"
                @mousemove="mousemove"
                @mouseenter="mouseenter"
                @mouseleave="mouseleave"
                ground="29"
              ></forestv>
            </div>
          </div>
          <img style="width:100px;" src="./assets/bigarrow.png">
          <div>
            <div>
              <div style="display:flex; flex-direction:row; justify-content: space-between;">
                <p class="componenttitle" style="margin-left: 20px; margin-top: 20px;">Team Garden</p>
                <div style="display:flex; flex-direction:row; align-items: center; ">
                  <button id="plantbook" @click="$bvModal.show('plant-book')">
                    <img style="width:35px; margin-bottom: 5px;" src="./assets/plantbook.png">
                    Plant Book
                  </button>
                </div>
              </div>
            <div>
              <div class="users">
                <img class="user" src="./assets/user1.png">
                <img class="user" src="./assets/user2.png">
                <img class="user" src="./assets/user3.png">
                <img class="user" src="./assets/user4.png">
              </div>
              <div>
                <b-form-group id="userselect">
                  <b-form-checkbox
                    v-model="allSelected"
                    aria-describedby="contributors"
                    aria-controls="contributors"
                    @change="toggleAll"
                    button
                    button-variant="outline-dark"
                    style="margin-left: 30px;"
                  >All</b-form-checkbox>
                  <b-form-checkbox-group
                    v-model="selected"
                    :options="contributors"
                    size="m"
                    @change="filterPlants"
                    buttons
                    id="userbutton"
                    button-variant="outline-secondary"
                    style="margin-left: 18px; "
                  ></b-form-checkbox-group>
                </b-form-group>
              </div>
            </div>
            <forestv
              class="forestv"
              len="8"
              :plants="garden.visiblePlants"
              @click="plant"
              @mousemove="mousemove"
              @mouseenter="mouseenter2"
              @mouseleave="mouseleave2"
              ground="1"
            ></forestv>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
        class="tooltip1"
        v-if="mouseOnCanvas2 && selectedPlant"
        v-bind:style="{ left: this.pointerX+'px', top: this.pointerY+'px'}"
      >
        <span class="tooltipname">{{ selectedPlant.owner }}'s {{ selectedPlant.type }}</span>
      </div>
      <div
        class="tooltip1"
        v-if="mouseOnCanvas && selectedAvailablePlant"
        v-bind:style="{ left: this.pointerX+'px', top: this.pointerY +'px'}"
      >
        <span
          class="tooltipname"
        >{{ selectedAvailablePlant.owner }}'s {{ selectedAvailablePlant.type }}</span>
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
</template>

<script>
import PullRequestList from "./components/PullRequestList.vue";
import githubcontroller from "./components/GithubController";
import forestv from "./components/Forestv0.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { getMaxLevel } from "./plants";
import PlantBook from "./components/PlantBook";
import Tutorial from "./components/Tutorial.vue";
import { defaultBranches } from "./constants";

export default {
  name: "app",
  components: {
    PlantBook,
    PullRequestList,
    forestv,
    githubcontroller,
    Tutorial
  },
  data() {
    return {
      flag: false,
      pointerX: -1,
      pointerY: -1,
      pickedPlant: [],
      branchList: defaultBranches,
      lastMouseTileX: -1,
      lastMouseTileY: -1,
      mouseOnCanvas: false,
      mouseOnCanvas2: false,
      garden: {
        visiblePlants: [],
        plants: [],
        availablePlants: [
          {
            type: "flower",
            owner: "Lisa",
            level: 0,
            position: { x: 0, y: 0 }
          },
          {
            type: "dotori",
            owner: "Jack",
            level: 0,
            position: { x: 1, y: 0 }
          }
        ]
      },
      selected: [],
      allSelected: false,
      contributors: ["Karl", "Lisa", "Jack", "Emma"]
    };
  },
  computed: {
    selectedPlant() {
      const planted = this.garden.plants.find(
        ({ position: { x, y } }) =>
          x === this.lastMouseTileX && y === this.lastMouseTileY
      );
      if (!planted) return;
      // console.log(planted.owner);
      return planted;
    },
    selectedAvailablePlant() {
      const planted = this.garden.availablePlants.find(
        ({ position: { x, y } }) =>
          x === this.lastMouseTileX && y === this.lastMouseTileY
      );
      if (!planted) return;
      // console.log(planted.owner);
      return planted;
    }
  },
  methods: {
    //added
    filterPlants(checked) {
      this.garden.visiblePlants = [];
      checked.forEach(contributor => {
         this.garden.plants.forEach(plant => {
          if (plant.owner == contributor) this.garden.visiblePlants.push(plant);
        })
      })

    },  
    toggleAll(checked) {
      this.selected = checked ? this.contributors.slice() : [];
      //changed
      if (checked) this.garden.visiblePlants = this.garden.plants;
      else this.garden.visiblePlants = [];
    },

    grow() {
      // this.watering = true;
      setTimeout(() => {
        this.toggleAll(true);
      }, 1000);

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
    addSeedToBox(request) {
      // this.watering = false;
      const plantList = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]);
      this.garden.availablePlants.forEach(plant => {
        plantList.delete(plant.position.y * 3 + plant.position.x);
      });
      if (plantList.size == 0) alert("으아악...");
      var pos = [...plantList.values()][0];
      this.garden.availablePlants.push({
        type: request.reward,
        owner: request.owner,
        level: 0,
        position: { x: pos % 3, y: Math.floor(pos / 3) }
      });
    },
    pick(x, y) {
      if (!this.findPlantInPosition(x, y, 1)) return;
      var flag = 0;
      this.garden.availablePlants.forEach(plant => {
        if (plant.position.x == x && plant.position.y == y) {
          if (
            !this.pickedPlant.includes(flag) &&
            !this.pickedPlant.includes(plant)
          ) {
            this.pickedPlant.push(plant);
            var item = this.garden.availablePlants.splice(flag, 1)[0];
            item.level = 1;
            this.garden.availablePlants.splice(flag, 0, item);

            this.toggleAll(true);

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
    },
    mousemove: function(x, y) {
      if (this.lastMouseTileX === x && this.lastMouseTileY === y) return;
      // const root = document.documentElement;
      // root.style.setProperty('--mouse-x',event.clientX);
      // root.style.setProperty('--mouse-y',event.clientY);

      this.pointerX = event.clientX;
      this.pointerY = event.clientY + 40;

      this.lastMouseTileX = x;
      this.lastMouseTileY = y;
      console.log(this.pointerX, this.pointerY);
    },
    mouseenter() {
      this.mouseOnCanvas = true;
      // console.log(this.mouseOnCanvas)
    },
    mouseleave() {
      this.mouseOnCanvas = false;
    },
    mouseenter2() {
      this.mouseOnCanvas2 = true;
      // console.log(this.mouseOnCanvas)
    },
    mouseleave2() {
      this.mouseOnCanvas2 = false;
    }
  },
  mounted: function() {
    this.$tours["myTour"].start();
  },

  watch: {
    selected(newVal, oldVal) {
      // Handle changes in individual checkboxes
      if (newVal.length === 0) {
        this.allSelected = false;
      } else if (newVal.length === this.contributors.length) {
        this.allSelected = true;
      } else {
        this.allSelected = false;
      }
    }
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
.users {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-left: 130px;
}

.user {
  height: 90px;
  margin-right: 15px;
  border-color: black;
  border-width: thick;
}
    .componenttitle {
        font-size: 25px;
        font-family: "Press Start 2P", cursive;
        color: black;
    }

#userselect {
  display: flex;
  flex-direction: row;
  font-family: "Press Start 2P", cursive;
  font-size: 20px;
  margin-top: 10px;
}

#userbutton {
  width: 420px;
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

    .tooltip1 {
        position: absolute;
        z-index:9999;
        word-wrap: normal;
    }

    .tooltipname {
        background-color: #b3e19d;
        padding: 10px;
    }
</style>