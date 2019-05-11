<template>
    <div class="modal-mask">
        <div class="modal-container">
            <h1>Book</h1>
            <button @click="$emit('close')">ok</button>
            <forestv :plants="plants"></forestv>
            <!--<canvas v-el="canvas" :width="cWidth" :height="cHeight"></canvas>-->
        </div>
    </div>
</template>

<script>
    import Forestv from "./Forestv0";
    // var ctx = null;

  export default {
    name: "PlantBook",
    components: {Forestv},
    data() {
      return {
        cWidth: 320,
        cHeight: 320,
        plants: [
          {
            type: "cherry_blossom",
            level: 4,
            position: { x: 0, y: 0 }
          }
        ]
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
    }

</style>