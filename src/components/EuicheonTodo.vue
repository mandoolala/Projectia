<template>
<div>
  <input type="text" v-model="input" @keydown.enter="addTodo" />
  <button @click="addTodo">Add TODO</button>
  <ul>
    <li v-bind:key="todo.id" v-for="todo in todos" v-text="todo.text" :style="{ textDecoration: todo.isDone ? 'line-through' : 'none' }" @click="toggleTodo(todo)"></li>
  </ul>
  <p>Total: {{ todosCount }}</p>
  <p>Active: {{ todosCount - doneTodosCount }}</p>
  <p>Done: {{ doneTodosCount }}</p>
</div>
</template>

<script>
export default {
  name: 'EuicheonTodo',
  data: function() {
      return {
        input: '',
        todos: [],
        count: 0
    };
  },
  computed: {
    todosCount() {
      return this.todos.length.toString();
    },
    doneTodosCount() {
      return this.todos.filter(e => e.isDone).length;
    },
  },
  methods: {
    addTodo() {
      this.todos.push({
          id: this.count,
        text: this.input,
        isDone: false,
      });
      this.input = '';
      this.count = this.count + 1;
    },
    toggleTodo(todo) {
      todo.isDone = !todo.isDone;
    },
  },
}
</script>

<style scoped>
ul {
    text-align: left
}
</style>