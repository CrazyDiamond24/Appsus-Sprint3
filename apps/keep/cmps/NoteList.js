import NotePreview from '../cmps/NotePreview.js'

export default {
  props: ['notes'],
  template: `
    <section class="note-list-section">
       <ul class="note-list">
        <li v-for="note in notes" :key="note.id" :style="note.style">
            <NotePreview :note="note" />
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
    },
    components: {
        NotePreview
    }
}
