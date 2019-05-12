
const terrains = require("./assets/tiles.png");
const plants = require("./assets/tiles.png");

const dirt = { source: terrains, index: 1 };
const healthy_dirt = { source: terrains, index: 7 };
const green_dirt = { source: terrains, index: 8 };
const grass = { source: terrains, index: 9 };
const plant_me = {source: terrains, index: 23 };

//cherry blossom
const cherry_hi = { source: plants, index: 24 };
const cherry_seedling = { source: plants, index: 2 };
const cherry_seedling2 = { source: plants, index: 3 };
const cherry_tree_s = { source: plants, index: 4 };
const cherry_tree_m = { source: plants, index: 5 };
const cherry_tree_l = { source: plants, index: 6 };

//dotori
const doto_hi = { source: plants, index: 25 }
const doto_seedling = { source: plants, index: 11 };
const doto_seedling2 = { source: plants, index: 12 };
const doto_tree_s = { source: plants, index: 13 };
const doto_tree_m = { source: plants, index: 14 };
const doto_tree_l = { source: plants, index: 15 };

//flower
const flower_hi = { source: plants, index: 26 };
const flower_seedling = { source: plants, index: 18 };
const flower_seedling2 = { source: plants, index: 19 };
const flower_tree_s = { source: plants, index: 20 };
const flower_tree_m = { source: plants, index: 21 };
const flower_tree_l  = { source: plants, index: 22 };




export const plantRepresentation = {
  "cherry_blossom": {
    name: "Cherry Blossom",
    levels: [
      [dirt, plant_me, cherry_seedling],
      [dirt, plant_me, cherry_hi],
      [dirt, dirt, cherry_seedling],
      [dirt, dirt, cherry_seedling2],
      [healthy_dirt, grass, cherry_tree_s],
      [healthy_dirt, grass, cherry_tree_m],
      [green_dirt, grass, cherry_tree_l]
    ],
    description: "You will see this tree every spring with that song in Korea"
  },
  "dotori": {
    name: "Acorn",
    levels: [
      [dirt, plant_me, doto_seedling],
      [dirt, plant_me, doto_hi],
      [dirt, dirt, doto_seedling],
      [dirt, dirt, doto_seedling2],
      [healthy_dirt, grass, doto_tree_s],
      [healthy_dirt, grass, doto_tree_m],
      [green_dirt, grass, doto_tree_l]
    ],
    description: "It is told that acorn was used as a currency in the past"
  },
  "flower": {
    name: "Flower",
    levels: [
      [dirt, plant_me, flower_seedling],
      [dirt, plant_me, flower_hi],
      [dirt, dirt, flower_seedling],
      [dirt, dirt, flower_seedling2],
      [healthy_dirt, grass, flower_tree_s],
      [healthy_dirt, grass, flower_tree_m],
      [green_dirt, grass, flower_tree_l]
    ],
    description: "Flower... But which flower??\n No one knows"
  }
};

export const getMaxLevel = (type) => plantRepresentation[type].levels.length - 1;