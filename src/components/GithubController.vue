<template>
    <div>
        <button id="show-modal" @click="showModal = true">Show Modal</button>
        <!-- use the modal component, pass in the prop -->
        <modal v-if="showModal" @close="showModal = false">
            <!--
              you can use custom content here to overwrite
              default content
            -->
            <h3 slot="header">Controller</h3>
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
</style>