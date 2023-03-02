export default {
  name: 'AddNote',
  template: `
        <section class="add-note">
         <input type="text"  :placeholder="noteTypePlaceHolder" @keyup.enter="addNote" v-model="newNote.info.value" />
        <section class="btns-container">
        <button v-for="noteType in noteTypes" @click="changeNoteType(noteType.type)" :title="noteType.title" :class="isNoteSelected(noteType.type)" >
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
        },
        {
          type: 'NoteImg',
          title: 'Enter image URL',
        },
        {
          type: 'NoteVid',
          title: 'Enter youtube URL',
        },
      ]
      return notesTypes
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
          return 'Add a note...'

        case 'NoteImg':
          return 'Enter image URL'

        case 'NoteVid':
          return 'Enter youtube video URL'

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
