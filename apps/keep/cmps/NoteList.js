import NotePreview from '../cmps/NotePreview.js'
import { keepService } from '../services/note.service.js'

export default {
  props: ['notes'],
  template: `
  <section class="note-list-section">
    <ul class="note-list">
      <li v-for="note in notes" :key="note.id" :style="note.style">
        <NotePreview :note="note" />
        <button title="Delete" class="delete-note-btn" @click="remove(note.id)">x</button>
        <input type="color" title="Change color" class="change-color-btn" @input="changeColor(note)">
      </li>
    </ul>
  </section>
    `,
  data() {
    return {
      pinnedNotes: [],
      unPinnedNotes: [],
    }
  },
  methods: {
    //add/edit/tog
    remove(noteId) {
      this.$emit('remove', noteId)
    },
    changeColor(note) {
      note.style.backgroundColor = event.target.value
      keepService.update(note)
    },
  },
  components: {
    NotePreview,
  },
}
