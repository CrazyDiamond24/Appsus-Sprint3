import NotePreview from '../cmps/NotePreview.js'
import { keepService } from '../services/note.service.js'
import { utilService } from './../../../services/util.service.js'

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
          <button title="Pin/Unpin" @click="togglePin(note)">{{ note.isPinned ? 'Unpin' : 'Pin' }}</button>
          <button title="Duplicate" class="duplicate-note-btn" @click="duplicate(note)">+</button>
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
    togglePin(note) {
      note.isPinned = !note.isPinned
      keepService.update(note)
    },
    duplicate(note) {
        console.log('duplicate')
        const duplicatedNote = JSON.parse(JSON.stringify(note))
        this.$emit('duplicate', duplicatedNote)
      }         
  },
  components: {
    NotePreview,
  },
}
