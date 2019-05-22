<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <button class="modal-default-button" @click="$emit('close')">
            X
          </button>
          <h4><b> ※ This is a mock-up GitHub controller for testing. </b></h4>

          <div class="modal-header">
            <img
              src="../assets/githublogoblack.png"
              style="width: 40px; height: 40px; margin-right:5px; align-items: center;"
            />
            <h2 style="margin-left: 4px; margin-top:3px;">GitHub</h2>
          </div>
          <div class="modal-body">
            <slot name="body"> </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal"
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Cabin");

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  /*position: relative;*/
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-container h4 {
  margin: 20px 0;
  color: #ff0000;
}

.modal-header {
  display: flex;
  justify-content: flex-start;
  font-family: "Cabin", sans-serif;
  font-weight: 900;
  background-color: black;
  color: white;
  line-height: 0.6;
  padding-bottom: 10px;
}

.modal-body {
  margin: 0px 0;
}

.modal-default-button {
  float: right;
  font-size: 30px;
  padding-left: 15px;
  padding-right: 15px;
  font-family: "Cabin", sans-serif;
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
