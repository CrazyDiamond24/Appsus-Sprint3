export default {
  name: 'NoteDetails',
  props: ['id'],
  template: `
      <section>
        <h2>Details</h2>
        <p>Details about note {{ id }}</p>
      </section>
    `,
  computed: {
    noteId() {
      return this.$route.params.id
    },
  },
}
