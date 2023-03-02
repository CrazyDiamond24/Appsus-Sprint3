export default {
  props: ['info'],
  template: `
  <div class="note-todo">
    <ol class="todos-list">
      <li v-for="todo in noteTodos" :key="todo.id" :class="[setTodoClassStatus(todo), 'todo']" @click="toggleTodo(todo.id)">
        <p :style="{ textDecoration: todo.doneAt ? 'line-through' : 'none' }">
          {{ todo.txt }}
        </p>
      </li>
    </ol>
  </div>
    `,
  data() {
    return {}
  },
  methods: {
    toggleTodo(todoId) {
      const todo = this.info.todos.find((todo) => todo.id === todoId)
      todo.doneAt = !todo.doneAt
    },
    setTodoClassStatus(todo) {
      return todo.doneAt ? 'done' : ''
    },
  },
  computed: {
    noteTitle() {
      return this.info.title || 'My List'
    },
    noteTodos() {
      return this.info.todos
    },
  },
}
