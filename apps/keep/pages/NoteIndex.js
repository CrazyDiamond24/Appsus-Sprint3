import { keepService } from '../services/note.service.js'
import NoteList from '../cmps/NoteList.js'
import AddNote from '../cmps/AddNote.js'
import NoteFilter from '../cmps/NoteFilter.js'
import { utilService } from './../../../services/util.service.js'

export default {
  name: 'noteIndex',
  template: `
    <section class="note-index">
    <router-view :notes="notes" />
    <AddNote @add="addNote"/>
    <!-- <NoteFilter @filter="setFilterBy" /> -->
      <section class="notes" v-if="pinnedNotes.length">
        <h2>Pinned Notes:</h2>
        <NoteList :notes="pinnedNotes"  @duplicate="duplicateNote" />
      </section>
      <section class="notes" v-if="unPinnedNotes.length">
        <!-- <h2>Notes:</h2> -->
        <NoteList :notes="unPinnedNotes" @remove="removeNote" @duplicate="duplicateNote" />
      </section>
    </section>
  `,
  data() {
    return {
      notes: [],
      filterBy: {},
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
    setFilterBy(searchTerm) {
      this.filterBy = searchTerm
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
    filteredNotes() {
      const regex = new RegExp(this.filterBy.text, 'i')
      return this.notes.filter(
        (note) => regex.test(note.title) || regex.test(note.info.txt)
      )
    },
    // allNotes() {
    //   return [...this.pinnedNotes, ...this.unPinnedNotes, ...this.filteredNotes]
    // },
  },
  components: {
    NoteList,
    AddNote,
    NoteFilter,
  },
}
