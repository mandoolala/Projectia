<template>
    <div>
  <ol>
    <li v-bind:key="todo.id" v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>
</template>

<script>
export default {
    data: function() {
        return{
            todos: [
                { id: 0, text: 'Hello' },
                { id: 1, text: 'I cannot make Todo List' },
                { id: 2, text: 'I am Sorry' },
                { id: 3, text: 'I will be back'}
            ]
        }
        
    }   
}
</script>