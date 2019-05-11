<template>
  <!-- import CSS -->
  <div id="pull-request">

      <div class="filters" style="display:flex">
          <button class="button" v-on:click="visibility = 'all'" :class="{ selected: visibility === 'all' }">All</button>
          <button class="button" v-on:click="visibility = 'waiting'" :class="{ selected: visibility === 'waiting' }">Waiting</button>
          <button class="button" v-on:click="visibility = 'merged'" :class="{ selected: visibility === 'merged' }">Merged</button>
      </div>

    <div>
        <div class="pullrequestcard"
                v-bind:key="pullrequest.id"
                v-bind:reward="pullrequest.reward"
                v-for="(pullrequest) in filteredPullRequests">

            <div class="title" v-bind:class="{ titleblur: pullrequest.water_status === 'Watered'}">
                <img class="status" v-bind:src="pullrequest.status_src">
                <a class="issue">{{pullrequest.name}}</a>
            </div>

            <div class="buttons">
                <div>
                    <b-button @click="$bvModal.show(getModalId(pullrequest.id))" class="collectbutton" v-bind:class=pullrequest.collect_status> Collect </b-button>
                    <b-modal :id="getModalId(pullrequest.id)" size="sm" title="Congratulations!" hide-header-close>
                        <h6>You have earned {{pullrequest.reward}} 씨앗! </h6>
                        <img class="reward" v-bind:src="pullrequest.reward_src">
                        <template slot="modal-footer" slot-scope="{ ok }">
                            <b-button :key="pullrequest.id" class="Collect" size="m" @click="$bvModal.hide(getModalId(pullrequest.id))" v-on:click="collectItem(pullrequest)"> Let's grow the plant! </b-button>
                        </template>
                    </b-modal>
                </div>
                <div>
                    <button v-if="!pullrequest.isMerged" class="collectbutton disabled"> Water </button>
                    <button v-else v-on:click="waterForest(pullrequest)" class="collectbutton" v-bind:class=pullrequest.water_status> Water </button>
                </div>
            </div>
        </div>

    </div>
  </div>
</template>


<script>


var filters = {
    all: function (pullrequests) {
        return pullrequests.filter(function(pullrequest){
            return pullrequest.isPulled
        })
    },
    waiting: function (pullrequests) {
        return pullrequests.filter(function (pullrequest) {
            return pullrequest.isPulled && !pullrequest.isMerged
        })
    },
    merged: function (pullrequests) {
        return pullrequests.filter(function (pullrequest) {
            return pullrequest.isPulled && pullrequest.isMerged
        })
    }
};


export default {
    el: "#pullrequest",
    props: ['pullRequests'],
    data(){
        return {
            visibility: 'all',
            modalShow: false
        }
    },
    computed: {
        filteredPullRequests: function () {
            return filters[this.visibility](this.pullRequests)
        }
    },
    methods: {
        getModalId: function(id) {
          return 'modal-' + id;
        },
        collectItem: function(request){
            request.collect_status = "Collected";
            if (!request.isMerged){
                request.status_src = require("../assets/waiting.png");
            }

            //move collected reward to container
            plant();
        },
        waterForest: function(request){
            request.water_status = "Watered";
            request.status_src = require("../assets/merged.png");

            //water forest
            grow();
        }

    },

}

</script>


<style scoped>

#pull_request {
  display: flex;
  flex-direction: column;
}

.filters {
    box-sizing: border-box;
    vertical-align: middle;
    display: inline-block;
    margin-top:10px ;
    margin-bottom: 40px;
    margin-left: 10px;
    margin-bottom: 15px;
}

.filters>.button{
    float: left;
    position: relative;
    border: 1px solid #DCDFE6;
    background: #FFF;
    color: #606266;
    outline: 0;
    margin: 0;
    display: inline-block;
    font-weight: 500;
    line-height: 0.8;
    white-space: nowrap;
    padding: 10px 30px;
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
    width: 850px;
    height: 80px;
    margin: 10px;
    padding: 10px;
    font-size: 20px;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    border: 1px solid #ebeef5;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

}

.title {
    display: flex;
    justify-content: flex-start;
}

.status{
    height: 28px;
    margin-left: 10px;
    margin-right: 10px;
}

.issue {
    color: #555555;
    font-size: 18px;
    align-self: center;
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
    margin-right: 15px;
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
//z-index: 1;
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