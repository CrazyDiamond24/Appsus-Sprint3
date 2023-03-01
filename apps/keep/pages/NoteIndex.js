import { keepService } from '../services/note.service.js'
import NoteList from '../cmps/NoteList.js'

export default {
  template: `
    <section class="note-index">
      <section class="notes" v-if="pinnedNotes.length">
        <h2>Pinned Notes:</h2>
        <NoteList :notes="pinnedNotes" />
      </section>
      <section class="notes" v-if="unPinnedNotes.length">
        <h2>Notes:</h2>
        <NoteList :notes="unPinnedNotes" />
      </section>
    </section>
  `,
  data() {
    return {
      notes: [],
    }
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
  },
}

