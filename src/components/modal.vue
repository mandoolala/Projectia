<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        <h1>
                            <img
                                    src="../assets/GitHub-Mark-120px-plus.png"
                                    style="width: 50px; height: 50px; margin-right:5px; align-items: center;"
                            >
                            GitHub
                        </h1>
                        <p><b>This is mock-up GitHub controller for testing.</b></p>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            <table>
                                <h4 style="color: #6aa73d;">
                                    <img
                                            src="../assets/git-branch-512.png"
                                            style="width: 18px; height: 28px; color: #6aa73d;"
                                    >
                                    Branches
                                </h4>
                                <tr v-bind:key = "branch.id" v-for="branch in branchList">
                                    <td style="width: 430px" v-if="!branch.isPulled" v-text="branch.title">
                                    </td>
                                    <button v-on:click="pull(branch.id)" v-if="!branch.isPulled">Pull Request
                                    </button>
                                </tr>
                                <hr>
                                <h4 style="color: #28a745;">
                                    <img
                                            src="../assets/git-pull-request-512.png"
                                            style="width: 20px; height: 28px; color: #6aa73d;"
                                    >
                                    Pull Requests
                                </h4>
                                <tr v-for="pullRequest in branchList" v-bind:key="pullRequest.id">
                                    <td v-if="!pullRequest.isMerged && pullRequest.isPulled">
                                    <input style="width: 300px" v-if="!pullRequest.isMerged && pullRequest.isPulled" placeholder="type your merge message" v-model="pullRequest.name">
                                    <button v-on:click="merge(pullRequest.id)" v-if="!pullRequest.isMerged && pullRequest.isPulled">Merge
                                    </button>
                                    </td>
                                </tr>
                            </table>
                        </slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer">
                            <button class="modal-default-button" @click="$emit('close')">
                                Back To Projectia
                            </button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "modal",
        data: function() {
            return {
                input: '',
                todos: [],
                count: 0,
                branchList:[
                    {
                        id:1,
                        title:"this is first branch",
                        name:"",
                        isPulled: false,
                        isMerged: false,
                        status:"new",
                        isCollected:false,
                        // src:require("../assets/new.png")
                    },
                    {
                        id:2,
                        title:"this is second branch",
                        name:"",
                        isPulled: false,
                        isMerged: false,
                        status:"new",
                        isCollected:false,
                        // src:require("../assets/new.png")
                    }
                ],
                pullRequestList:[

                ],
                mergeList:[

                ]
            };
            },
        methods: {
            pull: function(key){
                console.log(key)
                for (var i in this.branchList){
                    if(this.branchList[i].id === key){
                        this.branchList[i].isPulled = true;
                        // const idx = this.branchList.indexOf(this.branchList[i]);
                        // if (idx > -1) {
                        //     this.pullRequestList.push(this.branchList[idx]);
                        //     this.branchList.splice(idx, 1)
                        // }
                    }
                }
            },
            merge: function(key){
                for (var i in this.branchList){
                    if(this.branchList[i].id === key){
                        this.branchList[i].isMerged = true;
                        // const idx = this.pullRequestList.indexOf(this.pullRequestList[i]);
                        // if (idx > -1) {
                        //     this.mergeList.push(this.pullRequestList[idx]);
                        //     this.pullRequestList.splice(idx, 1)
                        // }
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 90%;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header p {
        margin: 20px 0;
        color: #ff0000;
    }

    .modal-body {
        margin: 20px 0;
    }

    .modal-default-button {
        float: right;
    }

    /*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */


    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>