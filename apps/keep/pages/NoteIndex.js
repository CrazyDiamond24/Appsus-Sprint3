import { keepService } from '../services/note.service.js'
import NoteList from '../cmps/NoteList.js'
import AddNote from '../cmps/AddNote.js'

export default {
  template: `
    <section class="note-index">
      <section class="notes" v-if="pinnedNotes.length">
        <h2>Pinned Notes:</h2>
        <NoteList :notes="pinnedNotes" />
      </section>
      <section class="notes" v-if="unPinnedNotes.length">
        <h2>Notes:</h2>
        <NoteList :notes="unPinnedNotes"
         @remove="removeNote" />
      </section>
      <AddNote @add="addNote"/>
    </section>
  `,
  data() {
    return {
      notes: [],
    }
  },
  methods: {
    addNote(newNote) {
      keepService.addNote(newNote).then(() => {
        console.log(newNote)
      })
    },
    removeNote(noteId) {
      keepService
        .remove(noteId)
        .then(() => {
          const idx = this.notes.findIndex((note) => note.id === noteId)
          this.notes.splice(idx, 1)
        })
        .catch((err) => {
          console.log('err')
        })
    },
  },
  created() {
    keepService.query().then((notes) => {
      this.notes = notes
    })
  },
  computed: {
    pinnedNotes() {
      return this.notes.filter((note) => note.isPinned)
    },
    unPinnedNotes() {
      return this.notes.filter((note) => !note.isPinned)
    },
  },
  components: {
    NoteList,
    AddNote,
  },
}
