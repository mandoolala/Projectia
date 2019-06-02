<template>
  <modal @close="$router.push('/')" clickToClose="true">
    <h3 slot="header">GitHub Controller</h3>
    <div class="main-content" slot="body">
      <div class="compare-pr" v-if="compare">
        <div v-if="!selectedBranch">
          <git-hub-page-title>
            <span slot="title">Compare Changes</span>
          </git-hub-page-title>
          <div class="branch-list">
            <div class="header">BRANCHES TO COMPARE</div>
            <div class="item" v-for="br in unpulledRequests">
              <img
                src="../assets/git-branch-512.png"
                style="height: 2rem; margin-right: 6px"
              />
              <router-link :to="'/github/compare/' + br.id">{{
                br.branch
              }}</router-link>
            </div>
          </div>
        </div>
        <div class="create" v-else>
          <git-hub-page-title>
            <span slot="title">Comparing Changes</span>
            <GitHubButton
              slot="actions"
              highlight
              @click="
                if (!title) {
                  alert('Please write the title for request');
                  return;
                }
                pull(selectedBranch, title);
                $router.push('/github');
              "
            >
              <span slot="text">Create pull request</span>
            </GitHubButton>
          </git-hub-page-title>
          <div class="form">
            <input
              v-model="title"
              class="title"
              placeholder="Write the title of your pull request"
            />
          </div>
          <iframe
            class="diff"
            :src="diffUrls[String((selectedBranch.id % 2) + 1)].src"
          >
          </iframe>
        </div>
      </div>

      <div class="pr-list" v-else-if="!selectedBranch">
        <git-hub-page-title>
          <span slot="title">Pull Requests</span>
          <GitHubButton
            slot="actions"
            highlight
            @click="$router.push('/github/compare')"
          >
            <span slot="text">New Pull Request</span>
          </GitHubButton>
        </git-hub-page-title>
        <div class="list" v-if="pullRequests.length > 0">
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
              <router-link
                :to="'/github/' + String(pullRequest.id)"
                class="list-title"
              >
                {{ pullRequest.name }}
              </router-link>
            </div>
            <span
              >#{{ pullRequest.id }} opened 3 days ago by
              {{ pullRequest.owner }}</span
            >
          </div>
        </div>

        <div v-else>
          No
        </div>
      </div>
      <div class="pr-detail" v-else>
        <div
          style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;"
        >
          <h4 style="font-size: 2rem;">
            <img
              :src="require('../assets/merged.png')"
              v-if="selectedBranch.isMerged"
              style="height: 2.3rem;"
            />
            <img
              :src="require('../assets/open.png')"
              v-else
              style="height: 2.3rem;"
            />
            {{ selectedBranch.name }} #{{ selectedBranch.id }}
          </h4>
          <div v-if="selectedBranch.isPulled && !selectedBranch.isMerged">
            <GitHubButton @click="$router.push('/github')">
              <span slot="text">Request for Change</span>
            </GitHubButton>
            <div style="width: 30px; display: inline-block;"></div>
            <GitHubButton
              highlight
              @click="
                merge(selectedBranch);
                $router.push('/github');
              "
            >
              <span slot="text">Merge</span>
            </GitHubButton>
          </div>
        </div>
        <iframe
          class="diff"
          :src="diffUrls[String((selectedBranch.id % 2) + 1)].src"
        >
        </iframe>
      </div>
    </div>
  </modal>
</template>

<script>
import { diffUrls } from "../constants";
import lodash from "lodash";

import store from "../store";
import PullIcon from "./PullIcon";
import MergeIcon from "./MergeIcon";
import GitHubButton from "./GitHubButton";
import modal from "./modal";
import GitHubPageTitle from "./GitHubPageTitle";

export default {
  name: "GitHubController",
  props: {
    compare: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { title: "" };
  },
  components: {
    GitHubPageTitle,
    PullIcon,
    MergeIcon,
    GitHubButton,
    modal
  },
  computed: {
    diffUrls() {
      return diffUrls;
    },
    branchList() {
      return store.state.branchList;
    },
    unpulledRequests() {
      const branchList = store.state.branchList;
      return branchList.filter(b => !b.isPulled);
    },
    pullRequests() {
      const branchList = store.state.branchList;
      const requested = branchList.filter(
        branch => branch.isPulled && !branch.isMerged
      );
      const merged = branchList.filter(branch => branch.isMerged);
      return lodash.sortBy(requested, m => m.pulledAt).concat(lodash.sortBy(merged, m => m.mergedAt).reverse());
    },
    selectedBranch() {
      const id = this.$route.params.id;
      if (!id) return;
      return store.state.branchList.find(b => String(b.id) === id);
    }
  },
  methods: {
    pull: function(branch, title) {
      store.commit("pull", { branch, title });
    },
    merge: function(branch) {
      store.commit("merge", branch);
    }
  },
  watch: {
    compare(to) {
      if (to) {
        this.title = '';
      }
    }
  }
};
</script>

<style scoped>
.branch-list {
  border: 1px solid #b8b8b8;
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.branch-list > .header {
  align-self: stretch;
  display: flex;
  justify-content: center;

  padding: 0.3rem;

  background: #f5f5f5;
  border: 1px solid #b8b8b8;
  border-radius: 4px 4px 0px 0px;
}

.branch-list > .item {
  margin: 0.3rem;
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

.diff {
  width: 100%;
  min-height: 60vh;
}

.compare-pr .create .form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.compare-pr .create .form > .title {
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 6px;
  background: #ffffff;
  border: 1px solid #b8b8b8;
  border-radius: 2px;
}

.compare-pr .create .form > .description {
  margin-top: 1rem;
  background: #ffffff;
  border: 1px solid #b8b8b8;
  border-radius: 2px;
}
</style>
