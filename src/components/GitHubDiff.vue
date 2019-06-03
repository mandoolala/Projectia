<template>
  <iframe
    ref="diff"
    frameborder="0"
    :style="{ width: '100%', height: diffHeight + 'px' }"
    :src="src"
    @load="updateDiffHeight()"
  ></iframe>
</template>

<script>
export default {
  name: "GitHubDiff",
  props: {
    src: {
      type: String
    }
  },
  data() {
    return { diffHeight: 0 };
  },
  methods: {
    updateDiffHeight() {
      this.diffHeight =
        this.$refs.diff.contentWindow.document.body.scrollHeight + 100;
    }
  }
};
</script>

<style scoped></style>
