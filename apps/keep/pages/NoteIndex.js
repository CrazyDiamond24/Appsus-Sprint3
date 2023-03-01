import { keepService } from '../services/note.service.js'
import NoteList from '../cmps/NoteList.js'
import AddNote from '../cmps/AddNote.js'
import { utilService } from './../../../services/util.service.js'

export default {
  name: 'noteIndex',
  template: `
    <section class="note-index">
    <router-view></router-view>
    <AddNote @add="addNote"/>
      <section class="notes" v-if="pinnedNotes.length">
        <h2>Pinned Notes:</h2>
        <NoteList :notes="pinnedNotes" @duplicate="duplicateNote" />
      </section>
      <section class="notes" v-if="unPinnedNotes.length">
        <h2>Notes:</h2>
        <NoteList :notes="unPinnedNotes" @remove="removeNote" @duplicate="duplicateNote" />
      </section>
    </section>
  `,
  data() {
    return {
      notes: [],
    }
  },
  methods: {
    addNote(newNote) {
      keepService.addNote(newNote).then((addedNote) => {
        console.log(addedNote)
        this.notes.push(addedNote)
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
    duplicateNote(note) {
      const duplicatedNote = JSON.parse(JSON.stringify(note))
      keepService.postNote(duplicatedNote).then((addedNote) => {
        this.notes.push(addedNote)
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
