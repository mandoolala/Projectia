<template>
  <div>
    <button id="show-modal" @click="$router.push('github')">
      Go to GitHub
      <img
        src="../assets/githublogoblack.png"
        style="width: 30px; height: 30px; margin-bottom:5px; align-items: center;"
      />
    </button>
    <!--        <input v-model="message">-->
    <!--        <button v-on:click="pull">pull request</button>-->
    <!--        <button v-on:click="merge">merge</button>-->
  </div>
</template>

<script>
export default {
  name: "GotoGitHub",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto");

#show-modal {
  margin-top: 5px;
  padding-top: 5px;
  margin-left: 430px;

  font-size: 18px;
  font-weight: 900;
  font-family: "Roboto", sans-serif;
  color: white;
  border-radius: 5px;
  background-color: black;
  opacity: 0.8;
  cursor: pointer;
}

#show-modal:hover {
  opacity: 0.6;
}
</style>
