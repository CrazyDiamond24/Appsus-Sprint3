export default {
    template: `
  <section class="note-filter">
    <input
      v-model="filterBy.text"
      placeholder="Search notes"
      type="text"
      @input="emitFilter"
    />
  </section>
    `,
  data() {
    return {
      filterBy: { text: '' },
    }
  },
  methods: {
    emitFilter() {
      this.$emit('filter', this.filterBy)
    },
  },
}