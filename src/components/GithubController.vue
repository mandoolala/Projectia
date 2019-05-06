<template>
    <div>
        <input v-model="message">
        <button v-on:click="pull">pull request</button>
        <button v-on:click="merge">merge</button>
    </div>
</template>


<script>
export default {
    name: 'githubcontroller',
    data: function() {
        return {
                pullRequestList:[]
            };
        },
    methods: {
        pull: function(){
            let newRequest = {
                message: this.message,
                collected: false,
                merged: false
            }
            this.pullRequestList.push(newRequest)
            console.log(this.pullRequestList)
        },
        merge: function(){

        }
    }
}
</script>

<style>
</style>