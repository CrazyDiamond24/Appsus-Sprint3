import NotePreview from '../cmps/NotePreview.js'
import { keepService } from '../services/note.service.js'

export default {
  props: ['notes'],
  template: `
  <section class="note-list-section">
    <ul class="note-list">
      <li v-for="note in notes" :key="note.id" :style="note.style">
        <NotePreview :note="note" />
        <div class="control-btns">
          <button title="Delete" class="delete-note-btn" @click="remove(note.id)">x</button>
          <button title="Change color" @click="openColorPicker(note)">
            Clr
          </button>
          <input type="color" class="color-picker" v-model="selectedColor" @input="changeColor(note)" hidden>
        </div>
      </li>
    </ul>
  </section>
    `,
  data() {
    return {
      pinnedNotes: [],
      unPinnedNotes: [],
      selectedColor: '',
    }
  },
  methods: {
    //add/edit/tog
    remove(noteId) {
      this.$emit('remove', noteId)
    },
    openColorPicker(note) {
        this.selectedColor = note.style.backgroundColor
        const input = event.target.nextElementSibling
        input.click()
      },
      changeColor(note) {
        note.style.backgroundColor = this.selectedColor
        keepService.update(note)
      },
  },
  components: {
    NotePreview,
  },
}
