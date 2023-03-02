//import types
import NoteTxt from './NoteTxt.js'
import NoteImg from './NoteImg.js'
import NoteVid from './NoteVid.js'

export default {
  props: ['note'],
  template: `
 <div @click.stop="onSelectNote(note.id)" class="note-preview" :style="{ backgroundColor: note.style.backgroundColor }">
    <h3 class="title" contenteditable @input="onTitleInput">{{ note.info.title }}</h3>
    <Component :is="note.type" :info="note.info" ></Component>
    <div class="text" contenteditable @input="onTextInput">{{ note.info.txt }}</div>
  </div>
    `,
  created() {},
  components: {
    NoteTxt,
    NoteImg,
    NoteVid,
  },
  methods: {
    onSelectNote(noteId) {
      this.$router.push({ name: 'NoteDetails', params: { id: noteId } })
    },
    onTitleInput(event) {
      //clone the obj and the info and update them with new val
      this.$emit('update-note', { ...this.note, info: { ...this.note.info, title: event.target.innerText } })
    },
    onTextInput(event) {
      this.$emit('update-note', { ...this.note, info: { ...this.note.info, txt: event.target.innerText } })
    },
  },
  computed: {
    noteComponent() {
      switch (this.note.type) {
        case 'NoteTxt':
          return 'note-txt'
        case 'NoteImg':
          return 'note-img'
        default:
          return null
      }
    },
  },
}
