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
                                            style="width: 20px; height: 28px; color: #6aa73d;"
                                    >
                                    Branches
                                </h4>
                                <tr v-bind:key = "branch.id" v-for="branch in branchList">
                                    <td style="width: 600px" v-if="!branch.isPulled">
                                        <div class="wrrrper">
                                            <div><span class="branch_name" v-text="branch.branch"></span></div>
                                            <div><input style="width: 300px" v-if="!branch.isPulled" placeholder="type your pull request message" v-model="branch.name"></div>
                                            <div><button class="pull" v-on:click="pull(branch.id)" v-if="!branch.isPulled">Pull Request</button></div>
                                        </div>
                                    </td>
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
                                        <div class="wrrrper">
                                            <div><span class="branch_name" v-text="pullRequest.branch">.</span></div>
                                            <div><span v-text="pullRequest.name"></span></div>
                                            <div><button class="merge" v-on:click="merge(pullRequest.id)" v-if="!pullRequest.isMerged && pullRequest.isPulled">Merge
                                            </button></div>
                                        </div>
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
            pull: function(key){
                // console.log(key)
                for (var i in this.branchList){
                    if(this.branchList[i].id === key){
                        this.branchList[i].isPulled = true;
                    }
                }
            },
            merge: function(key){
                for (var i in this.branchList){
                    if(this.branchList[i].id === key){
                        this.branchList[i].isMerged = true;
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
        /*vertical-align: middle;*/
    }

    .modal-container {
        width: 90%;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        /*position: relative;*/
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
        font-family: Roboto;
        font-weight: 900;
        background-color: black;
        color: white;
        line-height: 0.8;
    }

    .modal-body {
        margin: 0px 0;
    }

    .modal-default-button {
        float: right;
        font-size: 30px;
        padding-left: 15px;
        padding-right: 15px;
    }

    .wrrrper {
        display: grid;
        grid-template-columns: 200px 350px 200px;
    }

    .branch_name {
        color: #0366d6;
        background-color: #eaf5ff;
        border-radius: 3px;
        font: 16px SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
        padding: 2px 6px;
    }

    .pull {
        background-color: #eff3f6;
        background-image: linear-gradient(-180deg,#fafbfc,#eff3f6 90%);
        color: #24292e;
        float: left;
        font-size: 18px;
        line-height: 20px;
        padding: 3px 10px;
        background-position: -1px -1px;
        background-repeat: repeat-x;
        background-size: 110% 110%;
        border: 1px solid rgba(27,31,35,.2);
        border-radius: .25em;
        cursor: pointer;
        display: inline-block;
        font-weight: 300;
        position: relative;
        user-select: none;
        vertical-align: middle;
        white-space: nowrap;
    }

    .merge {
        background-color: #2cbe4e;
        background-image: linear-gradient(-180deg, #2cbe4e, #00aa26 90%);
        color: #fff;
        display: inline-block;
        font-weight: 300;
        line-height: 20px;
        padding: 4px 8px;
        text-align: center;
        border: 1px solid rgba(27,31,35,.2);
        border-radius: .25em;
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
        -webkit-transform: scale(1);
        transform: scale(1);
    }
</style>