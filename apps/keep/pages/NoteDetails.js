import NotePreview from '../cmps/NotePreview.js'

export default {
  name: 'NoteDetails',
  props: ['id', 'notes'],
  template: `
  <div class="modal-wrapper">
    <div class="modal-backdrop"></div>
    <div class="modal">
      <h2>Click text to edit</h2>
      <section>
      
        <NotePreview v-if="note" :note="note" @update-note="onUpdateNote" />
        <RouterLink to="/notes" class="back-link" >Save</RouterLink>
      </section>
    </div>
  </div>
  `,
  computed: {
    note() {
      return this.notes.find((note) => note.id === this.id)
    },
  },
  components: {
    NotePreview,
  },
  methods: {
    onUpdateNote(updatedNote) {
      const index = this.notes.findIndex((note) => note.id === updatedNote.id)
      if (index !== -1) {
        this.notes.splice(index, 1, updatedNote)
      }
    },

}
}

//note preview should get a prop to tell it that it's being rendered in the preview setcion
//if isdetails is true to render it