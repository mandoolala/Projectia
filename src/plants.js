
const terrains = require("./assets/tiles.png");
const plants = require("./assets/tiles.png");

const dirt = { source: terrains, index: 1 };
const healthy_dirt = { source: terrains, index: 7 };
const green_dirt = { source: terrains, index: 8 };
const grass = { source: terrains, index: 9 };

const seedling = { source: plants, index: 2};
const seedling2 = { source: plants, index: 3 };
const tree_s = { source: plants, index: 4 };
const tree_m = { source: plants, index: 5 };
const tree_l = { source: plants, index: 6 };

export const plantRepresentation = {
  "cherry_blossom": {
    name: "Cherry Blossom",
    levels: [
      [dirt, dirt, seedling],
      [dirt, dirt, seedling2],
      [healthy_dirt, grass, tree_s],
      [healthy_dirt, grass, tree_m],
      [green_dirt, grass, tree_l],
    ],
  }
};

export const getMaxLevel = (type) => plantRepresentation[type].levels.length - 1;
