<template>
  <div>
    <button id="show-modal" @click="showModal = true">
      Go to GitHub
      <img
        src="../assets/githublogoblack.png"
        style="width: 30px; height: 30px; margin-bottom:5px; align-items: center;"
      />
    </button>
    <!-- use the modal component, pass in the prop -->
    <modal v-if="showModal" @close="showModal = false" clickToClose="true">
      <!--
              you can use custom content here to overwrite
              default content
            -->
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
                style="width: 1.5rem; height: 1.5rem;">
              </PullIcon>
              <span class="list-title">
                {{ pullRequest.name }}
              </span>
            </div>
            <span
              >#{{ pullRequest.id }} opened 3 days ago by
              {{ pullRequest.owner }}</span
            >
          </div>
        </div>
      </div>
    </modal>
    <!--        <input v-model="message">-->
    <!--        <button v-on:click="pull">pull request</button>-->
    <!--        <button v-on:click="merge">merge</button>-->
  </div>
</template>

<script>
import modal from "./modal.vue";
import GitHubButton from "./GitHubButton";
import MergeIcon from "./MergeIcon";
import PullIcon from "./PullIcon";

export default {
  name: "githubcontroller",
  props: ["branchList"],
  data: function() {
    return {
      showModal: false
    };
  },
  components: {
    PullIcon,
    MergeIcon,
    GitHubButton,
    modal
  },
  computed: {
    pullRequests() {
      const requested = this.branchList.filter(
        branch => branch.isPulled && !branch.isMerged
      );
      const merged = this.branchList.filter(branch => branch.isMerged);
      return requested.concat(merged);
    }
  },
  methods: {
    pull: function(branch) {
      // console.log(key)
      for (var i in this.branchList) {
        if (this.branchList[i].id === branch.id) {
          this.branchList[i].isPulled = true;
        }
      }
    },
    merge: function(branch) {
      for (var i in this.branchList) {
        if (this.branchList[i].id === branch.id) {
          this.branchList[i].isMerged = true;

          branch.water_status = "Water";
          branch.status_src = require("../assets/merged.png");
        }
      }
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto");

#show-modal {
  margin-top: 5px;
  padding-top: 5px;
  margin-left: 430px;

  font-size: 18px;
  font-weight: 900;
  font-family: "Roboto", sans-serif;
  color: white;
  border-radius: 5px;
  background-color: black;
  opacity: 0.8;
  cursor: pointer;
}

#show-modal:hover {
  opacity: 0.6;
}

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
