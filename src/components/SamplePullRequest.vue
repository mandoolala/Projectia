<template>
    <div style="padding: 2rem;">
        <b-card
                title="Create the core visualization component"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 60rem;"
                class="mb-2"
        >
            <b-badge variant="success">Open</b-badge>
            <b-card-text>The pull request is not merged yet</b-card-text>
            <div style="height: 2rem;"></div>
            <b-button :id="`popover-1-${placement}`">Pending {{ placement }}</b-button>
            <b-popover
                    :target="`popover-1-${placement}`"
                    :placement="placement"
                    title="Popover!"
                    triggers="hover focus"
                    :content="`Placement ${placement}`"
            ></b-popover>
            <b-button style="margin-left: 1rem;" variant="primary">Go to GitHub</b-button>
        </b-card>
    </div>
</template>

<script>
  export default {
    name: "SamplePullRequest.vue",
    data() {
      return {
        placement: 'Reward'
      }
    }
  }
</script>

<style scoped>

</style>