<template>
  <!-- import CSS -->
  <div id="pull-request">

      <div class="filters" style="display:flex">
          <button class="button" :class="{ selected: visibility == 'all' }">All</button>
          <button class="button" :class="{ selected: visibility == 'onProgress' }">On Progress</button>
          <button class="button" :class="{ selected: visibility == 'merged' }">Merged</button>
      </div>

    <div>
        <div class="pullrequestcard"
                v-bind:key="index"
                v-for="(pullrequest, index) in filteredPullRequests">

            <div class="title" v-bind:class="{ titleblur: pullrequest.collect_status === 'collected'}">
                <img class="logo" src="../assets/GitHub-Mark-120px-plus.png">
                <a class="issue" v-bind:href="pullrequest.url">{{pullrequest.name}}</a>
            </div>

            <div class="status" v-bind:class="{ statusblur: pullrequest.collect_status === 'collected'}">
                <img v-bind:class=pullrequest.status v-bind:src="pullrequest.src">
                <button class="collectbutton" v-bind:class=pullrequest.collect_status >Collect</button>
            </div>

        </div>

    </div>
  </div>
</template>


<script>


var filters = {
    all: function (pullrequests) {
        return pullrequests
    },
    onProgress: function (pullrequests) {
        return pullrequests.filter(function (pullrequests) {
            return pullrequests.onprogress
        })
    },
    merged: function (pullrequests) {
        return pullrequests.filter(function (pullrequests) {
            return pullrequests.merged
        })
    }
}


export default {
    el: "#pullrequest",
    data(){
        return {
            pullRequests: [
                {
                    name: "fix pullrequestlist.vue",
                    status: "merged",
                    collect_status: "collected",
                    src: require("../assets/merged.png"),
                    contributor: "",
                    url: ""
                },
                {
                    name: "fix 2",
                    status: "merged",
                    collect_status: "collect",
                    src: require("../assets/merged.png"),
                    contributor: "",
                    url: ""
                },
                {
                    name: "fixx",
                    status: "progress",
                    collect_status: "collect-disabled",
                    src: require("../assets/progress.png"),
                    contributor: "",
                    url: ""
                },
            ],

            new: '',
            visibility: 'all',
        }
    },
    computed: {
        filteredPullRequests: function () {
            return filters[this.visibility](this.pullRequests)
        }
    },
    methods: {
        // AddRequest: function(){
        //     this.pullRequests.push({
        //
        //     })
        // },
        //
        // UpdateRequest: function(request){
        //     this.pullRequests.status = "merged";
        //     this.pullRequests.collect_status = "collected";
        // }

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
    margin-left: 15px;
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
    padding: 10px 40px;
    font-size: 14px;
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
    width: 400px;
    height: 120px;
    margin: 10px;
    font-size: 20px;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    border: 1px solid #ebeef5;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

}

.title {
    margin-left: 12px;
    display: flex;
    justify-content: flex-start;
}

.logo{
    width: 25px;
    height: 25px;
    margin-right:5px;
}

.issue {
    color: #555555;
    font-size: 18px;
}

.titleblur{
    opacity:0.4;
}

.status {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.progress{
    height: 23px;
    margin-top: 12px;
    margin-left: 12px;

}

.merged{
    height: 21px;
    margin-top:12px;
    margin-left: 12px;
}

.statusblur{
    opacity:0.6;
}


.collectbutton{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    transition: .1s;
    font-weight: 500;
    padding: 10px 18px;
    font-size: 14px;
    border-radius: 4px;
    margin-right: 15px;
}

.collect-disabled {
    color: #fff;
    background-color: #b3e19d;
    border-color: #b3e19d;
}

.collect {
    color: #fff;
    background-color: #67c23a;
    border-color:#67c23a;
}

.collected{
    color: #fff;
    background-color: #c8c9cc;
    border-color: #c8c9cc;
}


.reward{
    width:200px;
    height:200px;
    margin-left:30px;
}



</style>