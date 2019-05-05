<template>
  <div>
    <h1>Projectia</h1>
    <Hyojin></Hyojin>
    <Yejun></Yejun>
    <MinJoo></MinJoo>
    <EuicheonTodo></EuicheonTodo>
  </div>
</template>

<script>

import Hyojin from './Hyojin';
import EuicheonTodo from './EuicheonTodo.vue'
import Yejun from './Yejun';
import MinJoo from './MinJoo';


export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    Hyojin,
    EuicheonTodo,
    Yejun,
    MinJoo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
