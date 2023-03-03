export default {
  props: ['info'],
  template: `
  <div class="note-todo">
    <ol class="todos-list">
      <li v-for="todo in noteTodos" :key="todo.id">
        <p @click.stop="toggleTodoDone(todo)" :class="{'done': todo.isDone}">
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
    toggleTodoDone(todo) {
      todo.isDone = !todo.isDone
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
