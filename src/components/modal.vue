<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <button class="modal-default-button" @click="$emit('close')"> X </button>
                    <h4><b> ※ This is a mock-up GitHub controller for testing. </b></h4>

                    <div class="modal-header">
                        <img src="../assets/githublogoblack.png"
                             style="width: 40px; height: 40px; margin-right:5px; align-items: center;">
                        <h2>GitHub</h2>
                    </div>
                    <div class="modal-body">
                        <slot name="body">
                            <table>
                                <h4 style="color: #6aa73d; font-weight: bold">
                                    <img
                                            src="../assets/git-branch-512.png"
                                            style="width: 18px; height: 28px; color: #6aa73d;"
                                    >
                                    Branches
                                </h4>
                                <tr v-bind:key = "branch.id" v-for="branch in branchList">
                                    <td style="width: 430px" v-if="!branch.isPulled" v-text="branch.branch">
                                    </td>
                                    <button v-on:click="pull(branch)" v-if="!branch.isPulled">Pull Request
                                    </button>
                                </tr>
                                <hr>
                                <h4 style="color: #28a745; font-weight: bold">
                                    <img
                                            src="../assets/git-pull-request-512.png"
                                            style="width: 20px; height: 28px; color: #6aa73d;"
                                    >
                                    Pull Requests
                                </h4>
                                <tr v-for="pullRequest in branchList" v-bind:key="pullRequest.id">
                                    <td v-if="!pullRequest.isMerged && pullRequest.isPulled">
                                        <h5 v-text="pullRequest.id + '. ' + pullRequest.branch">.</h5>
                                        <input style="width: 300px" v-if="!pullRequest.isMerged && pullRequest.isPulled" placeholder="type your merge message" v-model="pullRequest.name">
                                        <button v-on:click="merge(pullRequest)" v-if="!pullRequest.isMerged && pullRequest.isPulled">Merge
                                        </button>
                                        <p></p>
                                    </td>
                                </tr>
                            </table>
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
        props: ['branchList'],
        // data: function() {
        //     return {
        //
        //     };
        //     },
        methods: {
            pull: function(branch){
                // console.log(key)
                for (var i in this.branchList){
                    if(this.branchList[i].id === branch.id){
                        this.branchList[i].isPulled = true;
                    }
                }
            },
            merge: function(branch){
                for (var i in this.branchList){
                    if(this.branchList[i].id === branch.id){
                        this.branchList[i].isMerged = true;
                        branch.status = "merged";
                        branch.water_status = "Water";
                        branch.src = require("../assets/merged.png");
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

    .modal-container h4 {
        margin: 20px 0;
        color: #ff0000;
    }

    .modal-header{
        display: flex;
        justify-content: flex-start;
        font-family: 'Cabin', sans-serif;
        font-weight: 900;
        background-color: black;
        color: white;
        line-height: 0.8;
    }

    .modal-body {
        margin: 20px 0;
    }

    .modal-default-button {
        float: right;
        font-size: 30px;
        padding-left: 15px;
        padding-right: 15px;
        font-family: 'Cabin', sans-serif;

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