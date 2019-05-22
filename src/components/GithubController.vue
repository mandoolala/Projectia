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
      <table slot="body">
        <h4 style="color: #6aa73d; font-weight: bold">
          <img
            src="../assets/git-branch-512.png"
            style="width: 20px; height: 28px; color: #6aa73d;"
          />
          Branches
        </h4>
        <tr v-bind:key="branch.id" v-for="branch in branchList">
          <td style="width: 600px" v-if="!branch.isPulled">
            <div class="wrrrper">
              <div>
                <span class="branch_name" v-text="branch.branch"></span>
              </div>
              <div>
                <input
                  style="width: 300px"
                  v-if="!branch.isPulled"
                  placeholder="Type your pull request message"
                  v-model="branch.name"
                />
              </div>
              <div>
                <button
                  class="pull"
                  v-on:click="pull(branch)"
                  v-if="!branch.isPulled"
                >
                  Pull Request
                </button>
              </div>
            </div>
          </td>
        </tr>
        <hr />
        <h4 style="color: #28a745; font-weight: bold">
          <img
            src="../assets/git-pull-request-512.png"
            style="width: 20px; height: 28px; color: #6aa73d;"
          />
          Pull Requests
        </h4>
        <tr v-for="pullRequest in branchList" v-bind:key="pullRequest.id">
          <td v-if="pullRequest.isPulled">
            <div class="wrrrper">
              <div>
                <span class="branch_name" v-text="pullRequest.branch">.</span>
              </div>
              <div><span v-text="pullRequest.name"></span></div>
              <div v-if="!pullRequest.isMerged">
                <button
                  class="merge"
                  v-on:click="merge(pullRequest)"
                  v-if="!pullRequest.isMerged && pullRequest.isPulled"
                >
                  Merge
                </button>
              </div>
              <div v-if="pullRequest.isMerged">
                <img
                  src="../assets/merged.png"
                  style="height: 30px; width: 80px;"
                />
              </div>
            </div>
            <p></p>
          </td>
        </tr>
      </table>
    </modal>
    <!--        <input v-model="message">-->
    <!--        <button v-on:click="pull">pull request</button>-->
    <!--        <button v-on:click="merge">merge</button>-->
  </div>
</template>

<script>
import modal from "./modal.vue";

export default {
  name: "githubcontroller",
  props: ["branchList"],
  data: function() {
    return {
      showModal: false
    };
  },
  components: {
    modal
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

.wrrrper {
  display: grid;
  grid-template-columns: 200px 350px 200px;
  margin-bottom: 7px;
}

.branch_name {
  color: #0366d6;
  background-color: #eaf5ff;
  border-radius: 3px;
  font: 16px SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
    monospace;
  padding: 2px 6px;
}

.pull {
  background-color: #eff3f6;
  background-image: linear-gradient(-180deg, #fafbfc, #eff3f6 90%);
  color: #24292e;
  float: left;
  font-size: 14px;
  line-height: 20px;
  padding: 3px 10px;
  background-position: -1px -1px;
  background-repeat: repeat-x;
  background-size: 110% 110%;
  border: 1px solid rgba(27, 31, 35, 0.2);
  border-radius: 0.25em;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  position: relative;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
}

.merge {
  background-color: #2cbe4e;
  font-size: 14px;
  background-image: linear-gradient(-180deg, #2cbe4e, #00aa26 90%);
  color: #fff;
  display: inline-block;
  font-weight: 600;
  line-height: 20px;
  padding: 4px 8px;
  text-align: center;
  border: 1px solid rgba(27, 31, 35, 0.2);
  border-radius: 0.25em;
}
</style>
