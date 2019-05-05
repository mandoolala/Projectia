<template>
    <div>
        <button v-on:click="grow">grow all</button>
        <button v-on:click="plant">plant</button>
        <img class="grass" v-bind:key="img" v-for="img in img_src" v-bind:src="img">
        <canvas id="demo" width="512" height="512"></canvas>
    </div>
</template>

<script>
//
// Asset loader
//
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

//
// Keyboard handler
//

var Keyboard = {};

Keyboard.LEFT = 37;
Keyboard.RIGHT = 39;
Keyboard.UP = 38;
Keyboard.DOWN = 40;

Keyboard._keys = {};

Keyboard.listenForEvents = function (keys) {
    window.addEventListener('keydown', this._onKeyDown.bind(this));
    window.addEventListener('keyup', this._onKeyUp.bind(this));

    keys.forEach(function (key) {
        this._keys[key] = false;
    }.bind(this));
}

Keyboard._onKeyDown = function (event) {
    var keyCode = event.keyCode;
    if (keyCode in this._keys) {
        event.preventDefault();
        this._keys[keyCode] = true;
    }
};

Keyboard._onKeyUp = function (event) {
    var keyCode = event.keyCode;
    if (keyCode in this._keys) {
        event.preventDefault();
        this._keys[keyCode] = false;
    }
};

Keyboard.isDown = function (keyCode) {
    var notKeyCode = !keyCode
    if (notKeyCode in this._keys) {
        throw new Error('Keycode ' + keyCode + ' is not being listened to');
    }
    return this._keys[keyCode];
};

//
// Game object
//

var Game = {};

Game.run = function (context) {
    this.ctx = context;
    this._previousElapsed = 0;

    var p = this.load();
    Promise.all(p).then(function () {
        this.init();
        window.requestAnimationFrame(this.tick);
    }.bind(this));
};

Game.tick = function (elapsed) {
    window.requestAnimationFrame(this.tick);

    // clear previous frame
    this.ctx.clearRect(0, 0, 512, 512);

    // compute delta time in seconds -- also cap it
    var delta = (elapsed - this._previousElapsed) / 1000.0;
    delta = Math.min(delta, 0.25); // maximum delta of 250 ms
    this._previousElapsed = elapsed;

    // this.update(delta);
    this.render();
}.bind(Game);

// override these methods to create the demo
Game.init = function () {};
Game.update = function (delta) {};
Game.render = function () {};

// console.log("??")

// start up function
//

window.onload = function () {
    var context = document.getElementById('demo').getContext('2d');
    // console.log("context")
    Game.run(context);
};


///
var map = {
    cols: 8,
    rows: 8,
    tsize: 64,
    layers: [[
        6, 6, 6, 6, 6, 6, 6, 6,
        6, 6, 6, 6, 6, 6, 6, 6,
        6, 6, 6, 6, 6, 6, 6, 6,
        6, 6, 6, 6, 6, 6, 6, 6,
        6, 6, 6, 6, 6, 6, 6, 6,
        6, 6, 6, 6, 6, 6, 6, 6,
        6, 6, 6, 6, 6, 6, 6, 6,
        6, 6, 6, 6, 6, 6, 6, 6
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
        return this.layers[layer][row * map.cols + col];
    },
    setTile: function(layer,col,row,v){
        this.layers[layer][row * map.cols + col] = v
    }
};

Game.load = function () {
    return [
        Loader.loadImage('tiles', require('../assets/tiles.png')),
        Loader.loadImage('character', require('../assets/character.png'))
    ];
};

Game.init = function () {
    this.tileAtlas = Loader.getImage('tiles');
    this.hero = {x: 128, y: 384, image: Loader.getImage('character')};
};

Game._drawLayer = function (layer) {
    for (var c = 0; c < map.cols; c++) {
        for (var r = 0; r < map.rows; r++) {
            var tile = map.getTile(layer, c, r);
            if (tile !== 0) { // 0 => empty tile
                this.ctx.drawImage(
                    this.tileAtlas, // image
                    (tile - 1) * map.tsize, // source x
                    0, // source y
                    map.tsize, // source width
                    map.tsize, // source height
                    c * map.tsize,  // target x
                    r * map.tsize, // target y
                    map.tsize, // target width
                    map.tsize // target height
                );
            }
        }
    }
};

Game.render = function () {
    // draw map background layer
    this._drawLayer(0);
    // draw game sprites
    this.ctx.drawImage(this.hero.image, this.hero.x, this.hero.y);
    // draw map top layer
    this._drawLayer(1);
};

export default {
    name: 'forestv',
    data() {
        return{
            img_src:[],
            icon:require('../assets/logo.png')
        }
    },
    methods : {
        gogo: function() {
            if (event){
                Game.run(context);
            }
        },
        addgrass: function(event) {
            if(event){
                this.img_src.push(this.icon)
                // gogo
                this.img_src.push(this.icon)
            }
        },
        grow: function(event){
            for (var j=0;j<8;j++){
                for (var k=0;k<8;k++){
                    if ((map.getTile(1,j,k) != 0)&&(map.getTile(1,j,k)<4)) {
                        map.setTile(1,j,k,(map.getTile(1,j,k)+1))
                    }
                }
            }
        },
        plant: function(event){
            while(true){
                var col = Math.floor(Math.random() * 8);
                var row = Math.floor(Math.random() * 8);
                if (map.getTile(1,col,row) == 0){
                    map.setTile(1,col,row,1)
                    break;
                }
            }
        }
    }
}
</script>
