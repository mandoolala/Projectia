
export const branch_work_in_progress = 'work_in_progress';
export const branch_merge_requested = 'merge_requested';
export const branch_merged = 'merged';

export const defaultBranches = [
  {
    id: 1,
    branch: "Karl-bugfix-branch",
    owner: "Karl",
    name: "Fix bugs in PullRequestList.vue",
    status: branch_work_in_progress,

    pulledAt: null,
    mergedAt: null,
    collect_status:"Collect",
    water_status: "Water",
    reward: "cherry_blossom",
    reward_src: require("./assets/rewards/cherryblossom.png")
  },
  {
    id: 2,
    branch:"Karl-new-feature-branch",
    owner: "Karl",
    name:"",
    status: branch_work_in_progress,

    pulledAt: null,
    mergedAt: null,
    collect_status:"Collect",
    water_status: "Water",
    reward: "flower",
    reward_src:require("./assets/rewards/Jangmigrown.png")
  },
  {
    id: 3,
    branch:"Karl-performance-branch",
    owner: "Karl",
    name:"",
    status: branch_work_in_progress,

    pulledAt: null,
    mergedAt: null,
    collect_status:"Collect",
    water_status: "Water",
    reward: "cherry_blossom",
    reward_src:require("./assets/rewards/cherryblossom.png")
  },
  {
    id: 4,
    branch:"Kar-dotori-branch",
    owner: "Karl",
    name:"",
    status: branch_work_in_progress,

    pulledAt: null,
    mergedAt: null,
    collect_status:"Collect",
    water_status: "Water",
    reward: "dotori",
    reward_src:require("./assets/rewards/dottoritree.png")
  },
  {
    id: 5,
    branch:"Karl-branch",
    owner: "Karl",
    name: "Integrate Super Fancy State Management Library",
    status: branch_merged,

    pulledAt: null,
    mergedAt: new Date().getTime(),
    collect_status:"Collect",
    water_status: "Water",
    reward: "dotori",
    reward_src:require("./assets/rewards/dottoritree.png")
  },
  {
    id: 6,
    branch:"Emma-branch",
    owner: "Emma",
    name: "Refactor dashboard component",
    status: branch_merge_requested,

    pulledAt: new Date().getTime(),
    mergedAt: null,
    collect_status: "Collect",
    water_status: "Water",
    reward: "cherry_blossom",
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