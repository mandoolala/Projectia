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
                        <p>This is mock-up GitHub controller for testing.</p>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
<!--                            <span style="white-space: pre-line"></span>-->
<!--                            <button v-on:click="merge">merge</button>-->
<!--                            <p>Branches List</p>-->

<!--                            <input type="text" v-model="input" @keydown.enter="addBracnch" />-->
<!--                            <button @keydown.enter="addBracnch" >Add Branch</button>-->
<!--                            <ul>-->
<!--                                <li v-bind:key="branch.id" v-for="branch in branchList" v-text="branch.text">-->
<!--&lt;!&ndash;                                    <div>&ndash;&gt;-->
<!--&lt;!&ndash;                                        <input v-model="message">&ndash;&gt;-->
<!--&lt;!&ndash;                                        <button v-on:click="pull">pull request</button>&ndash;&gt;-->
<!--&lt;!&ndash;                                    </div>&ndash;&gt;-->
<!--                                </li>-->
<!--                            </ul>-->
                            <table>
                                <tr v-bind:key = "branch.id" v-for="branch in branchList">
                                    <td v-if ="!branch.isPulled" v-text="branch.text">
                                    </td>
                                    <button v-on:click="pull(key)">Pull Request
                                    </button>
                                </tr>
                                <hr>
                                <tr v-for="pullRequest in pullRequestList" v-bind:key="pullRequest.id">
                                    <td v-if="!pullRequest.isMerged" v-text="pullRequest.text">
                                    </td>
                                    <button v-on:click="merge(key)">Merge
                                    </button>
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
                        text:"this is first branch",
                        isPulled: false,
                        isMerged: false
                    },
                    {
                        id:2,
                        text:"this is second branch",
                        isPulled: false,
                        isMerged: false
                    }
                ],
                pullRequestList:[

                ],
                mergeList:[

                ]
            };
            },
        methods: {
            addBracnch: function(){
                this.branchList.push({
                    id: this.count,
                    text: this.input,
                    isDone: false,
                });
                this.input = '';
                this.count = this.count + 1;
            },
            pull: function(key){
                for (var i in this.branchList){
                    if(this.branchList[i].key === key){
                        this.branchList[i].isPulled = true;
                        const idx = this.branchList.indexOf(this.branchList[i]);
                        if (idx > -1) {
                            this.pullRequestList.push(this.branchList[idx]);
                            this.branchList.splice(idx, 1)
                        }
                    }
                }
            },
            merge: function(key){
                for (var i in this.pullRequestList){
                    if(this.pullRequestList[i].key === key){
                        this.pullRequestList[i].isMerged = true;
                        const idx = this.pullRequestList.indexOf(this.pullRequestList[i]);
                        if (idx > -1) {
                            this.mergeList.push(this.pullRequestList[idx]);
                            this.pullRequestList.splice(idx, 1)
                        }
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