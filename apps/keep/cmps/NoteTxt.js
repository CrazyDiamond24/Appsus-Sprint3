export default {
  props: ['info'],
  template: `
    <div class="note-txt">
        <p class="txt">
            <!-- {{info.txt}} -->
        </p>
    </div>
`,
  data() {
    return {}
  },
  methods: {},
  watch: {
    txt() {
      console.log('text')
    },
  },
  created() {},
  computed: {
    noteTxt() {
      return this.data.info.txt
    },
  },
}
