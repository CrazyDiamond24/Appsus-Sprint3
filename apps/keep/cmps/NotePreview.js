//import types
import NoteTxt from './NoteTxt.js'
import NoteImg from './NoteImg.js'
import NoteVid from './NoteVid.js'
import NoteTodo from './NoteTodo.js'

export default {
  props: ['note'],
  template: `
  <div
    @click.stop="onSelectNote(note.id)"
    class="note-preview"
    :style="{ backgroundColor: note.style.backgroundColor }"
  >
    <h3
      class="title"
      :contenteditable="$route.name === 'NoteDetails'"
      @input="onTitleInput"
    >
      {{ note.info.title }}
    </h3>
    <component :is="note.type" :info="note.info"></component>
    <div
      class="text"
      :contenteditable="$route.name === 'NoteDetails'"
      @input="onTextInput"
    >
      {{ note.info.txt }}
    </div>
  </div>
    `,
  created() {},
  components: {
    NoteTxt,
    NoteImg,
    NoteVid,
    NoteTodo,
  },
  methods: {
    onSelectNote(noteId) {
      this.$router.push({ name: 'NoteDetails', params: { id: noteId } })
    },
    onTitleInput(event) {
      //clone the obj and the info and update them with new val
      this.$emit('update-note', {
        ...this.note,
        info: { ...this.note.info, title: event.target.innerText },
      })
    },
    onTextInput(event) {
      this.$emit('update-note', {
        ...this.note,
        info: { ...this.note.info, txt: event.target.innerText },
      })
    },
    toggleTodo(todoId) {
      const data = {
        noteId: this.note.id,
        todoId,
      }
      this.$emit('toggleTodo', data)
    },
  },
  computed: {},
}
