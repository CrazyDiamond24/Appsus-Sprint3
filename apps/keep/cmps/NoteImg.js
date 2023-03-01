export default {
  props: ['info'],
  template: `
    <div class="note-img"  >
     
      <img :src="info.url" alt="alt"  />
    </div>
`,
  data() {
    return {}
  },
  methods: {},
  computed: {
    noteTitle() {
        return this.data.info.title
    },
    noteImgUrl() {
        return this.data.info.url
    },
  },
  created() {},
}
