<template>
  <button
    :class="[highlight ? 'green' : 'white']"
    v-on:click="$emit('click')"
  >
    <slot name="text"></slot>
  </button>
</template>

<script>
export default {
  name: "GitHubButton",
  props: {
    highlight: {
      default: false,
      type: Boolean
    }
  }
};
</script>

<style scoped>
.white {
  background-color: #eff3f6;
  background-image: linear-gradient(-180deg, #fafbfc, #eff3f6 90%);
  color: #24292e;
  font-size: 14px;
  line-height: 20px;
  padding: 3px 10px;
  background-position: -1px -1px;
  background-repeat: repeat-x;
  background-size: 110% 110%;
  border: 1px solid rgba(27, 31, 35, 0.2);
  border-radius: 0.25em;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  position: relative;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
}

.green {
  background-color: #2cbe4e;
  font-size: 14px;
  background-image: linear-gradient(-180deg, #2cbe4e, #00aa26 90%);
  color: #fff;
  display: inline-block;
  font-weight: 600;
  line-height: 20px;
  padding: 4px 8px;
  text-align: center;
  border: 1px solid rgba(27, 31, 35, 0.2);
  border-radius: 0.25em;
}
</style>
