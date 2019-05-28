
import Vuex from 'vuex';
import {defaultBranches} from "./constants";

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
    pull: function(state, branch) {
      for (var i in state.branchList) {
        if (state.branchList[i].id === branch.id) {
          state.branchList[i].isPulled = true;
        }
      }
    },
    merge: function(state, branch) {
      for (var i in state.branchList) {
        if (state.branchList[i].id === branch.id) {
          const branch = state.branchList[i];
          branch.isPulled = true;
          branch.isMerged = true;
          branch.mergedAt = new Date().getTime();
          branch.water_status = "Water";
          branch.status_src = require("./assets/merged.png");
        }
      }
    }
  }
});

export default store;
