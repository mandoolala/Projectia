<template>
    <div id="todo-list">
        <form v-on:submit.prevent="AddTodo">
            <label for="new-todo">Add a todo</label>
            <input
                    v-model="newTodo"
                    id="new-todo"
                    placeholder="FeedMandoo.then(mandoo => return HappyMandoo(mandoo);)"
            >
            <button>Add</button>
            <!-- v-on:click="AddTodo"> -->
        </form>
        <ul>
            <template v-for="item in items">
                <li>{{ item.msg }}</li>
                <li class="divider" role="presentation"></li>
            </template>
            <li v-bind:key="index" v-for="(todo, index) in todoList"
                v-on:remove="todoList.splice(index, 1)">
                {{ todo.text }}
                <button v-on:click="$emit('remove')">Remove</button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "minjoo-todo",
        data() {
            return {
                newTodo: '',
                todoList: [
                    {id: 0, text: 'learn vue.js'},
                    {id: 1, text: 'finish HCI PR3'},
                    {id: 2, text: 'learn algorithms'}
                ],
                nextTodoId: 3
            }
        },
        methods: {
            AddTodo: function () {
                this.todoList.push({
                    id: this.nextTodoId++,
                    text: this.newTodo
                });
                this.newTodo = '';
            }
        }
    }

</script>

<style scoped>
    #todo-list {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>