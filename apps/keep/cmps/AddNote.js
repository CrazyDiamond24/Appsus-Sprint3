import { svgNoteService } from '../services/note.svgserice.js'

export default {
  name: 'AddNote',
  template: `
        <section class="add-note">
         <input type="text"  :placeholder="noteTypePlaceHolder" @keyup.enter="addNote" v-model="newNote.info.value" />
        <section class="btns-container">
        <button v-for="noteType in noteTypes" @click="changeNoteType(noteType.type)" :title="noteType.title" :class="isNoteSelected(noteType.type)">
        <i v-html="getSvgNote(noteType.icon)"></i>
      </button>
        </section>
        </section>
    `,

  data() {
    return {
      newNote: {
        type: 'NoteTxt',
        isPinned: false,
        info: {
          value: '',
        },
      },
      notesTypes: [],
    }
  },
  methods: {
    getNotesTypes() {
      const notesTypes = [
        {
          type: 'NoteTxt',
          title: 'Free text',
          icon: 'add_text'
        },
        {
          type: 'NoteImg',
          title: 'Add image',
          icon: 'add_image',
        },
        {
          type: 'NoteVid',
          title: 'Add video',
          icon: 'add_video',
        },
        {
          type: 'NoteTodo',
          title: 'ToDo List',
          icon: 'add_todo',
        },
      ]
      return notesTypes
    },
    getSvgNote(iconName) {
      return svgNoteService.getSvgNote(iconName)
    },
    changeNoteType(noteType) {
      this.newNote.type = noteType
    },
    isNoteSelected(type) {
      return type === this.newNote.type ? 'selected' : ''
    },
    addNote() {
      this.$emit('add', this.newNote)
      this.newNote = {
        type: 'NoteTxt',
        isPinned: true,
        info: {
          value: '',
        },
      }
    },
  },
  computed: {
    noteTypePlaceHolder() {
      switch (this.newNote.type) {
        case 'NoteTxt':
          return 'Take a note...'

        case 'NoteImg':
          return 'Enter image URL'

        case 'NoteVid':
          return 'Enter youtube video URL'

        case 'NoteTodo':
          return 'Enter comma separated todos'

        default:
          this.newNote.type = 'NoteTxt'
          return 'Add a note...'
      }
    },
  },
  components: {},
  created() {
    this.noteTypes = this.getNotesTypes()
  },
}
