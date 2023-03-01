//import types
import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"



export default {
    props: ['note'],
    template: `
    <div @click="onSelectNote(note.id)" class="note-preview">
    <h3 class="title">{{note.info.title}}</h3>
    <Component :is="note.type" :info="note.info" ></Component>
</div>
    `,
    created() {},
    components: {
        NoteTxt,
        NoteImg,
    },
    methods: {
        onSelectNote(noteId){
            console.log('note selected', noteId);
        }
        },
    computed: {
        noteComponent() {
          switch (this.note.type) {
            case "noteTxt":
              return "note-txt";
            case "noteImg":
              return "note-img";
            default:
              return null;
          }
}
    }
}