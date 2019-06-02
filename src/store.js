
import Vuex from 'vuex';
import {branch_merge_requested, branch_merged, defaultBranches} from "./constants";

import Vue from 'vue'
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    branchList: defaultBranches
  },
  mutations: {
    increment (state) {
      state.count++
    },
    pull: function(state, payload) {
      const { branch, title } = payload;
      for (var i in state.branchList) {
        if (state.branchList[i].id === branch.id) {
          const branch = state.branchList[i];
          branch.pulledAt = new Date().getTime();
          branch.status = branch_merge_requested;
          branch.name = title
        }
      }
    },
    merge: function(state, branch) {
      for (var i in state.branchList) {
        if (state.branchList[i].id === branch.id) {
          const branch = state.branchList[i];
          branch.status = branch_merged;
          branch.mergedAt = new Date().getTime();
          branch.water_status = "Water";
          branch.status_src = require("./assets/merged.png");
        }
      }
    }
  }
});

export default store;
