<template>
  <!-- import CSS -->
  <div id="pull-request" >

      <div class="filters" style="display:flex">
          <button class="button" v-on:click="visibility = 'all'" :class="{ selected: visibility === 'all' }">All</button>
          <button class="button" v-on:click="visibility = 'waiting'" :class="{ selected: visibility === 'waiting' }">Waiting</button>
          <button class="button" v-on:click="visibility = 'merged'" :class="{ selected: visibility === 'merged' }">Merged</button>
      </div>

    <div style="width:510px; height:350px; overflow-x:hidden; overflow-y: auto;">
        <div class="pullrequestcard"
                v-bind:key="pullrequest.id"
                v-bind:reward="pullrequest.reward"
                v-for="(pullrequest) in filteredPullRequests">

            <div class="title" v-bind:class="{ titleblur: pullrequest.water_status === 'Watered'}">
                <img class="status" :src="pullrequest.collect_status === 'Collected' && pullrequest.status !== branch_merged ? require('../assets/waiting.png') : pullrequest.status_src">
                <a class="issue">{{pullrequest.name}}</a>
            </div>

            <div class="buttons">
                <div>
                    <b-button @click="$bvModal.show(getModalId(pullrequest.id))" class="collectbutton" v-bind:class="{ [pullrequest.collect_status]: true }"> Collect </b-button>
                    <b-modal :id="getModalId(pullrequest.id)" size="sm" title="Congratulations!" style="align-self: center" hide-header-close>
                        <h6>You have earned {{plantRepresentation[pullrequest.reward].name}} seed! </h6>
                        <img class="reward" v-bind:src="pullrequest.reward_src">
                        <template slot="modal-footer" slot-scope="{ ok }">
                            <b-button :key="pullrequest.id" class="Collect" size="m" @click="$bvModal.hide(getModalId(pullrequest.id))" v-on:click="collectItem(pullrequest)"> Let's grow the plant! </b-button>
                        </template>
                    </b-modal>
                </div>
                <div>
                    <button v-if="pullrequest.status !== branch_merged" class="collectbutton disabled"> Water </button>
                    <button v-else v-on:click="waterForest(pullrequest)" class="collectbutton" v-bind:class=pullrequest.water_status> Water </button>
                </div>
            </div>
        </div>

    </div>
  </div>
</template>


<script>
import { plantRepresentation } from '../plants';
import {branch_merge_requested, branch_merged, branch_work_in_progress} from "../constants";
import store from "../store";

var filters = {
    all: function (pullrequests) {
        return pullrequests.filter(function(pullrequest){
            return pullrequest.status !== branch_work_in_progress
        })
    },
    waiting: function (pullrequests) {
        return pullrequests.filter(function (pullrequest) {
            return pullrequest.status === branch_merge_requested
        })
    },
    merged: function (pullrequests) {
        return pullrequests.filter(function (pullrequest) {
            return pullrequest.status === branch_merged
        })
    }
};

const displayableByBranchStatus = {
  [branch_work_in_progress]: {
  },
  [branch_merge_requested]: {
    status_src: require("../assets/open.png"),
  },
  [branch_merged]: {
    status_src: require("../assets/merged.png")
  }
};




export default {
    el: "#pullrequest",
    data(){
        return {
            visibility: 'all',
            modalShow: false,
          plantRepresentation
        }
    },
    computed: {

      pullRequests() {
        return store.state.branchList;
      },
        filteredPullRequests: function () {
            return filters[this.visibility](this.pullRequests)
              .map(pr => ({ ...pr, status_src: displayableByBranchStatus[pr.status].status_src}))
        },

          branch_merged() { return branch_merged; },
          branch_merge_requested() { return branch_merge_requested; },
          branch_work_in_progress() { return branch_work_in_progress; }
    },
    methods: {
        getModalId: function(id) {
          return 'modal-' + id;
        },
        collectItem: function(request){
            store.commit('collect', request);
            this.$emit("addPlant", request);
            //move collected reward to container
        },
        waterForest: function(request){
          store.commit('water', request);
            // request.water_status = "Watered";
            // request.status_src = require("../assets/merged.png");

            //water forest
            this.$emit("grow");
        }

    },

}

</script>


<style scoped>

#pull_request {
  display: flex;
  flex-direction: column;
  /* width: 510px;
  height: 510px;
  overflow: auto; */
}

.filters {
    box-sizing: border-box;
    vertical-align: middle;
    display: inline-block;
    margin-left: 20px;
    margin-bottom: 20px;
}

.filters>.button{
    float: left;
    position: relative;
    border: 1px solid #DCDFE6;
    background: #FFF;
    background-color: #fdfdfd;
    color: #606266;
    outline: 0;
    margin: 0;
    display: inline-block;
    font-weight: 600;
    line-height: 0.8;
    white-space: nowrap;
    padding: 10px 30px;
    margin-top: 10px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: .1s;
    transition-property: all;
    transition-duration: 0.1s;
    transition-timing-function: ease;
    transition-delay: 0s;
}

.filters>.button:focus, .filters>.button:active, .filters>.button:hover {
    z-index: 1;
    background-color: #e7e7e7;
}


.filters>.button:not(:first-child){
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: -1px;
}

.filters>.button:first-child{
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.filters>.button:not(:last-child){
    margin-right:-1px;
}

.filters>.button:not(:first-child):not(:last-child) {
    border-radius: 0;
}

.pullrequestcard {
    width: 480px;
    height: 100px;
    margin: 10px;
    padding: 10px;
    font-size: 10px;
    line-height: 1.5em;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    background-color: #fbfbfb;
    border: 1px solid #ebeef5;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-left: 20px;

}

.title {
    display: flex;
    justify-content: flex-start;
}

.status{
    height: 28px;
    margin-left: 2px;
    margin-right: 5px;
}

.issue {
    color: #555555;
    font-size: 15px;
    align-self: center;
    margin-left:5px;
}

.titleblur{
    opacity:0.4;
    text-decoration: line-through;
}

.buttons{
    display:flex;
    flex-direction: row;
    justify-content: flex-end;
}


.collectbutton{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    transition: .1s;
    font-weight: 500;
    padding: 10px 18px;
    font-size: 16px;
    border-radius: 4px;
    margin-right: 10px;
}


.Collect {
    color: #fff;
    background-color: #67c23a;
    border-color:#67c23a;
}

.Collected{
    color: #fff;
    background-color: #b3e19d;
    border-color: #b3e19d;
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
}

.Water:focus, .Water:hover .Collect:focus, .Collect:hover {
    background-color: #e7e7e7;
    border-color: #e7e7e7;
    /*background-color: #72cce5;*/
    /*border-color:  #72cce5;*/

}

.disabled{
    color: #fff;
    background-color: #e7e7e7;
    border-color: #e7e7e7;
    cursor: not-allowed;
    pointer-events: none;
}

.Watered {
    color: #fff;
    background-color: #72cce5;
    border-color:  #72cce5;
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
}

.Water{
    color: #fff;
    background-color: #72cce5;
    border-color:  #72cce5;
}


.reward{
    width:200px;
    height:200px;
    margin-left:30px;
}



</style>