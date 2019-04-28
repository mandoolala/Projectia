<template>
  <div>
    <h1>Projectia</h1>
    <Hyojin></Hyojin>
  </div>
</template>

<script>
import Hyojin from './Hyojin'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    Hyojin
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
