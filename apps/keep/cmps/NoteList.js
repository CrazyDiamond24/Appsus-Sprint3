import NotePreview from '../cmps/NotePreview.js'
import { keepService } from '../services/note.service.js'
import { utilService } from './../../../services/util.service.js'
import { svgNoteService } from '../services/note.svgserice.js'
import ColorPicker from '../cmps/ColorPicker.js'

export default {
  props: ['notes'],
  template: `
  <section class="note-list-section">
    <ul class="note-list">
      <li class="note-li" v-for="note in notes" :key="note.id" :style="note.style">
        <NotePreview :note="note" />
        <div class="control-btns">
          <button title="Delete" class="delete-note-btn" @click="remove(note.id)" v-html="getSvgNote('delete_note')"></button>
          <button title="Change color" @click="toggleColorPicker(note)">
          <i v-html="getSvgNote('color_picker')"></i>
          </button>
          <button title="Pin/Unpin" @click="togglePin(note)" v-html="note.isPinned ? getSvgNote('unpin_note') : getSvgNote('pin_note')"></button>

          <button title="Duplicate" class="duplicate-note-btn" @click="duplicate(note)" v-html="getSvgNote('copy_note')"></button>
        </div>
        <div v-if="note === selectedNote">
          <ColorPicker v-model="note.style.backgroundColor" @input="updateNoteColor" />
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
      selectedNote: null,
      showColorPicker: false,
    }
  },
  methods: {
    remove(noteId) {
      this.$emit('remove', noteId)
    },
    updateNoteColor(newColor) {
      console.log('clr')
      this.selectedNote.style.backgroundColor = newColor
      keepService.update(this.selectedNote)
    },
    togglePin(note) {
      note.isPinned = !note.isPinned
      keepService.update(note)
    },
    duplicate(note) {
      console.log('duplicate')
      const duplicatedNote = JSON.parse(JSON.stringify(note))
      this.$emit('duplicate', duplicatedNote)
    },
    toggleColorPicker(note) {
      if (this.selectedNote === note) {
        this.selectedNote = null
      } else {
        this.selectedNote = note
      }
    },
    getSvgNote(iconName) {
      return svgNoteService.getSvgNote(iconName)
    },
  },
  components: {
    NotePreview,
    ColorPicker,
  },
  computed: {
    isColorPickerVisible() {
      return !!this.selectedNote
    },
  },
}
