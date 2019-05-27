<template>
  <modal @close="$router.push('/')" clickToClose="true">
    <h3 slot="header">GitHub Controller</h3>
    <div class="main-content" slot="body">
      <div
        style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;"
      >
        <h4 style="font-size: 2rem;">
          <img src="../assets/git-branch-512.png" style="height: 2rem;" />
          Pull Requests
        </h4>
        <GitHubButton highlight>
          <span slot="text">New Pull Request</span>
        </GitHubButton>
      </div>
      <div class="list">
        <div class="list-item" v-for="pullRequest in pullRequests">
          <div>
            <MergeIcon
              v-if="pullRequest.isMerged"
              fill="#6f42c1"
              style="width: 1.5rem; height: 1.5rem;"
            ></MergeIcon>
            <PullIcon
              v-else
              fill="#28a745"
              style="width: 1.5rem; height: 1.5rem;"
            >
            </PullIcon>
            <span class="list-title">
              {{ pullRequest.name }}
            </span>
            <GitHubButton @click="merge(pullRequest)">
              <span slot="text">
                Merge
              </span>
            </GitHubButton>
          </div>
          <span
            >#{{ pullRequest.id }} opened 3 days ago by
            {{ pullRequest.owner }}</span
          >
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import lodash from "lodash";

import store from "../store";
import PullIcon from "./PullIcon";
import MergeIcon from "./MergeIcon";
import GitHubButton from "./GitHubButton";
import modal from "./modal";

export default {
  name: "GitHubController",
  components: {
    PullIcon,
    MergeIcon,
    GitHubButton,
    modal
  },
  computed: {
    branchList() {
      return store.state.branchList;
    },
    pullRequests() {
      const branchList = store.state.branchList;
      const requested = branchList.filter(
        branch => branch.isPulled && !branch.isMerged
      );
      const merged = branchList.filter(branch => branch.isMerged);
      return requested.concat(lodash.sortBy(merged, m => m.mergedAt).reverse());
    }
  },
  methods: {
    pull: function(branch) {
      store.commit("pull", branch);
    },
    merge: function(branch) {
      store.commit("merge", branch);
    }
  }
};
</script>

<style scoped>
.list {
  background: #f6f8fa;
  border: 1px solid #d1d5da;
  box-sizing: border-box;
  border-radius: 3px;
}

.list-item {
  border-top: 1px solid #e1e4e8;
  padding: 20px;
}

.list-title {
  font-size: 1.5rem;
}

.main-content {
  font-family: "Roboto", "Helvetica";
}
</style>
