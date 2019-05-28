export const defaultBranches = [
  {
    id: 1,
    branch: "Karl-bugfix-branch",
    owner: "Karl",
    name: "Fix bugs in PullRequestList.vue",
    isPulled: false,
    isMerged: false,
    mergedAt: null,
    collect_status:"Collect",
    water_status: "Water",
    reward: "cherry_blossom",
    status_src: require("./assets/open.png"),
    reward_src: require("./assets/rewards/cherryblossom.png")
  },
  {
    id: 2,
    branch:"Karl-new-feature-branch",
    owner: "Karl",
    name:"",
    isPulled: false,
    isMerged: false,
    mergedAt: null,
    collect_status:"Collect",
    water_status: "Water",
    reward: "flower",
    status_src: require("./assets/open.png"),
    reward_src:require("./assets/rewards/Jangmigrown.png")
  },
  {
    id: 3,
    branch:"Karl-performance-branch",
    owner: "Karl",
    name:"",
    isPulled: false,
    isMerged: false,
    mergedAt: null,
    collect_status:"Collect",
    water_status: "Water",
    reward: "cherry_blossom",
    status_src: require("./assets/open.png"),
    reward_src:require("./assets/rewards/cherryblossom.png")
  },
  {
    id: 4,
    branch:"Kar-dotori-branch",
    owner: "Karl",
    name:"",
    isPulled: false,
    isMerged: false,
    mergedAt: null,
    collect_status:"Collect",
    water_status: "Water",
    reward: "dotori",
    status_src: require("./assets/open.png"),
    reward_src:require("./assets/rewards/dottoritree.png")
  },
  {
    id: 5,
    branch:"Karl-branch",
    owner: "Karl",
    name: "Integrate Super Fancy State Management Library",
    isPulled: true,
    isMerged: true,
    mergedAt: new Date().getTime(),
    collect_status:"Collect",
    water_status: "Water",
    reward: "dotori",
    status_src: require("./assets/open.png"),
    reward_src:require("./assets/rewards/dottoritree.png")
  },
  {
    id: 6,
    branch:"Emma-branch",
    owner: "Emma",
    name: "Refactor dashboard component",
    isPulled: true,
    isMerged: false,
    mergedAt: null,
    collect_status: "Collect",
    water_status: "Water",
    reward: "cherry_blossom",
    status_src: require("./assets/open.png"),
    reward_src:require("./assets/rewards/dottoritree.png")
  }
];

export const diffUrls = {
  1: {
    src: require('file-loader!./assets/diffs/1.html'),
  },
  2: {
    src: require('file-loader!./assets/diffs/2.html'),
  }
};