<template>
    <div>
        <!-- <button v-on:click="grow">grow all</button> -->
        <!-- <button v-on:click="plant" >plant</button> -->
        <img class="grass" v-bind:key="img" v-for="img in img_src" v-bind:src="img">
        <div class="water" v-if="watering" ><img src="../assets/watering.png"></div>
        <canvas v-on:click="click" v-bind:id="canvasId" v-bind:width="len*64" v-bind:height="len*64"></canvas>
    </div>
</template>

<script>
//
// Asset loader
//
import {plantRepresentation} from "../plants";
import {createArrayWithNum} from "../utils";
// import { PerformanceObserver } from 'perf_hooks';

console.log("!!!")
var Loader = {
    images: {}
};

Loader.loadImage = function (key, src) {
    var img = new Image();

    var d = new Promise(function (resolve, reject) {
        img.onload = function () {
            this.images[key] = img;
            resolve(img);
        }.bind(this);

        img.onerror = function () {
            reject('Could not load image: ' + src);
        };
    }.bind(this));

    img.src = src;
    return d;
};

Loader.getImage = function (key) {
    return (key in this.images) ? this.images[key] : null;
};



// console.log("??")

// start up function
//

// window.onload = function () {
//     var context = document.getElementById(this.canvasId).getContext('2d');
//     // console.log("context")
//     Game.run(context);
// };

function newMap(len) {
    return {
        cols: len,
        rows: len,
        tsize: 64,
        layers: [[
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1
        ],  [
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ], [
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ]],
        getTile: function (layer, col, row) {
            return this.layers[layer][row * this.cols + col];
        },
        setTile: function(layer,col,row,v){
            this.layers[layer][row * this.cols + col] = v
        },
        initTiles: function() {
        const dirtLayer = createArrayWithNum(this.cols * this.rows, 1);
        const invisibleLayer = createArrayWithNum(this.cols * this.rows, 0);
        this.layers[0] = dirtLayer;
        this.layers[1] = invisibleLayer;
        this.layers[2] = [...invisibleLayer];
        }
    }
}

///
// var map = {
//     cols: 8,
//     rows: 8,
//     tsize: 64,
//     layers: [[
//         1, 1, 1, 1, 1, 1, 1, 1,
//         1, 1, 1, 1, 1, 1, 1, 1,
//         1, 1, 1, 1, 1, 1, 1, 1,
//         1, 1, 1, 1, 1, 1, 1, 1,
//         1, 1, 1, 1, 1, 1, 1, 1,
//         1, 1, 1, 1, 1, 1, 1, 1,
//         1, 1, 1, 1, 1, 1, 1, 1,
//         1, 1, 1, 1, 1, 1, 1, 1
//     ],  [
//         0, 0, 0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0, 0, 0
//     ], [
//         0, 0, 0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0, 0, 0
//     ]],
//     getTile: function (layer, col, row) {
//         return this.layers[layer][row * map.cols + col];
//     },
//     setTile: function(layer,col,row,v){
//         this.layers[layer][row * map.cols + col] = v
//     },
//     initTiles: function() {
//       const dirtLayer = createArrayWithNum(this.cols * this.rows, 1);
//       const invisibleLayer = createArrayWithNum(this.cols * this.rows, 0);
//       this.layers[0] = dirtLayer;
//       this.layers[1] = invisibleLayer;
//       this.layers[2] = [...invisibleLayer];
//     }
// };

function Game() {
        
    // override these methods to create the demo
    this.init = function () {};
    this.update = function (delta) {};
    this.render = function () {};
    this.render = function () {
        // draw map background layer
        this._drawLayer(0);
        // draw game sprites
        this.ctx.drawImage(this.hero.image, this.hero.x, this.hero.y);
        // draw map top layer
        this._drawLayer(1);
        this._drawLayer(2);
    };

    this.load = function () {
        return [
            Loader.loadImage('tiles', require('../assets/tiles.png')),
            Loader.loadImage('character', require('../assets/character.png'))
        ];
    };

    this.init = function () {
        this.tileAtlas = Loader.getImage('tiles');
        this.hero = {x: 128, y: 384, image: Loader.getImage('character')};
    };

    this._drawLayer = function (layer) {
        for (var c = 0; c < this.map.cols; c++) {
            for (var r = 0; r < this.map.rows; r++) {
                var tile = this.map.getTile(layer, c, r);
                if (tile !== 0) { // 0 => empty tile
                    this.ctx.drawImage(
                        this.tileAtlas, // image
                        (tile - 1) * this.map.tsize, // source x
                        0, // source y
                        this.map.tsize, // source width
                        this.map.tsize, // source height
                        c * this.map.tsize,  // target x
                        r * this.map.tsize, // target y
                        this.map.tsize, // target width
                        this.map.tsize // target height
                    );
                }
            }
        }
    }

            
    this.run = function (context, map) {
        this.ctx = context;
        this.map = map;
        this._previousElapsed = 0;

        var p = this.load();
        Promise.all(p).then(function () {
            this.init();
            window.requestAnimationFrame(this.tick);
        }.bind(this));
    };

    this.tick = function (elapsed) {
        window.requestAnimationFrame(this.tick);

        // clear previous frame
        this.ctx.clearRect(0, 0, 512, 512);

        // compute delta time in seconds -- also cap it
        var delta = (elapsed - this._previousElapsed) / 1000.0;
        delta = Math.min(delta, 0.25); // maximum delta of 250 ms
        this._previousElapsed = elapsed;

        // this.update(delta);
        this.render();
    }.bind(this);

}

export default {
    name: 'forestv',
    props: ['plants','canvasId','len'],
    data() {
        return{
            game: new Game(),
            map: newMap(this.len),
            img_src:[],
            icon:require('../assets/logo.png'),
            watering: false
        }
    },
    watch: {
      plants: function (newPlants) {

        this.map.initTiles();

        const layers = this.map.layers;
        newPlants.forEach(plant => {
          const repr = plantRepresentation[plant.type];
          const { x, y } = plant.position;

          repr.levels[plant.level].forEach((tile, layerIndex) => {
            const newLayer = layers[layerIndex] || [];
            // TODO:: Custom source
            newLayer[this.map.cols * y + x] = tile.index;
            layers[layerIndex] = newLayer;
          });
        });

        this.game.render();
      }
    },
    methods : {
        // gogo: function() {
        //     if (event){
        //         Game.run(context);
        //     }
        // },
        // addgrass: function(event) {
        //     if(event){
        //         this.img_src.push(this.icon)
        //         // gogo
        //         this.img_src.push(this.icon)
        //     }
        // },
        click: function(event) {
          const elem = document.getElementById(this.canvasId)
          const boundingRect = elem.getBoundingClientRect();
          const offsetX = (event.pageX - boundingRect.x);
          const offsetY = event.pageY - boundingRect.y;
          const xTile = Math.floor(this.map.cols * (offsetX / elem.width));
          const yTile = Math.floor(this.map.rows * (offsetY / elem.height));
          this.$emit('click', xTile, yTile);
        }
    },
    mounted: function () {
        var context = document.getElementById(this.canvasId).getContext('2d');
        this.game.run(context, this.map);
    }    
}
</script>
<style>
.water {
	animation: rotate-90-bl-ccw 2s cubic-bezier(0.250, 0.460, 0.450, 0.940) forwards;
    position: absolute;
    left: 1000px;
}

@keyframes rotate-90-bl-ccw {
  0% {
    transform: rotate(0);
    transform-origin: 0% 100%;
  }
  70% {
    transform: rotate(-90deg);
    transform-origin: 0% 100%;
  }
  100%{
    transform: rotate(10deg);
    transform-origin: 0% 100%;
    opacity:0;
  }
}

</style>
