<template>
    <div>
        <p>
            Yejun TODOs<br>
            <span class="description">Press Enter to Add A New TODO</span>
        </p>
        <input v-model="input" v-on:keypress.enter="clearInput(); addTodo($event.target.value)"/>
        <ul>
            <li v-bind:key="todo.createdAt" v-for="todo in todos">
                {{ todo.text }}
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: "Yejun",
    data() {
      return {
        input: '',
        todos: []
      }
    },
    methods: {
      clearInput () {
        this.input = '';
      },
      addTodo: function(todo) {
        this.todos.unshift({
          text: todo,
          createdAt: new Date().getTime()
        })
      }
    }
  }
</script>

<style scoped>
    .description {
        color: red;
    }
</style>