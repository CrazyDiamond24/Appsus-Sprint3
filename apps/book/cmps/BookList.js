import BookPreview from './BookPreview.js'

export default {
	props: ['books'],
	template: `
  <section class="book-list">
    <div class="card-grid">
      <BookPreview
        v-for="book in books"
        :key="book.id"
        :book="book"
        @remove="this.$emit('remove',$event)"
        @show-details="showDetails(book.id)"
      />    
    </div>
  </section>

    `,
	methods: {
		showDetails(bookId) {
			this.$emit('show-details', bookId)
		},
	},
	components: {
		BookPreview,
	},
}
