export default {
  props: ['info'],
  template: `
    <div class="note-txt">
        <pre class="txt">
            {{info.txt}}
        </pre>
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
