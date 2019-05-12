<template>
    <div>
        <button id="show-modal" @click="showModal = true">
                Go to GitHub
                <img src="../assets/githublogoblack.png"
                style="width: 30px; height: 30px; margin-bottom:5px; align-items: center;">
        </button>
        <!-- use the modal component, pass in the prop -->
        <modal v-bind:branchList="branchList" v-if="showModal" @close="showModal = false" clickToClose="true">
            <!--
              you can use custom content here to overwrite
              default content
            -->
            <h3 slot="header">GitHub Controller</h3>
        </modal>
<!--        <input v-model="message">-->
<!--        <button v-on:click="pull">pull request</button>-->
<!--        <button v-on:click="merge">merge</button>-->
    </div>
</template>


<script>
    import modal from "./modal.vue"

    export default {
        name: 'githubcontroller',
        props:["branchList"],
        data: function() {
            return {
                    showModal:false
                };
            },
        components:{
            modal
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto');

    #show-modal{
        margin-top: 5px;
        padding-top: 5px;
        margin-left: 430px;

        font-size: 18px;
        font-weight: 900;
        font-family: 'Roboto', sans-serif;
        color: white;
        border-radius: 5px;
        background-color: black;
        opacity:0.8;
        cursor:pointer;
    }

    #show-modal:hover{
        opacity:0.6;
    }


</style>