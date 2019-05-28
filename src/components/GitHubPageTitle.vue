<template>
  <div
    style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;"
  >
    <h4 style="font-size: 2rem;">
      <img src="../assets/git-branch-512.png" style="height: 2rem; margin-right: 6px" />
      <slot name="title"></slot>
    </h4>
    <slot name="actions"></slot>
  </div>
</template>

<script>
export default {
  name: "GitHubPageTitle"
};
</script>

<style scoped></style>
