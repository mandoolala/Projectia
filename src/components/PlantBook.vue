<template>
    <b-modal id="plant-book" hide-footer size="xl" title="Plant Book">
        <div class="book-container">
            <forestv class="forest" len="5" :plants="plants" @mousemove="mousemove" @mouseenter="mouseenter" @mouseleave="mouseleave"></forestv>
            <!--<canvas v-el="canvas" :width="cWidth" :height="cHeight"></canvas>-->

            <div>
                <h2>Information</h2>
                <div v-if="mouseOnCanvas && selectedPlant">
                    <h4>Name</h4>
                    <span>{{selectedPlant.name}}</span>
                    <h4>Description</h4>
                    <span>{{selectedPlant.description}}</span>
                </div>
                <div v-else>
                    Hover the mouse over plants to see information
                </div>
            </div>

        </div>
    </b-modal>
</template>

<script>
    import Forestv from "./Forestv0";
    import {getMaxLevel, plantRepresentation} from "../plants";
    // var ctx = null;

  export default {
    name: "PlantBook",
    components: {Forestv},
    data() {

      const plants = Object.entries(plantRepresentation).map(([type, _], index) => ({
        type,
        level: getMaxLevel(type),
        position: { x: index % 5, y: (index - index % 5) / 5}
      }));

      return {
        plants,
        lastMouseTileX: -1,
        lastMouseTileY: -1,
        mouseOnCanvas: false
      }
    },
    computed: {
      selectedPlant() {
        const planted = this.plants.find(({ position: { x, y }}) => (x === this.lastMouseTileX) && (y === this.lastMouseTileY));
        if (!planted) return;

        return plantRepresentation[planted.type];
      }
    },
    methods: {
      mousemove: function(x, y) {
        if (this.lastMouseTileX === x && this.lastMouseTileY === y)
          return;

        this.lastMouseTileX = x;
        this.lastMouseTileY = y;
        console.log(this.lastMouseTileX, this.lastMouseTileY)

      },
      mouseenter() {
        this.mouseOnCanvas = true;
      },
      mouseleave() {
        this.mouseOnCanvas = false;
      }
    },
    mounted() {
      // ctx = this.$$.canvas.getContext('2d');
      // ctx.clearRect(0, 0, this.cWidth, this.cHeight);
    }
  }
</script>

<style scoped>

    .modal-mask {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        z-index: 9998;
        background-color: rgba(0, 0, 0, 0.5);

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-container {
        background-color: white;
        padding: 2rem;
        min-width: 70rem;
    }

    .forest {
        width: 30rem;
    }

    .book-container {
        display: flex;

    }

</style>