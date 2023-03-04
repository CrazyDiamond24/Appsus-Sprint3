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
		// remove(bookId) {
		// 	this.$emit('remove', bookId)
		// },
		showDetails(bookId) {
			this.$emit('show-details', bookId)
		},
	},
	components: {
		BookPreview,
	},
}



// <!-- <ul class="book-list">
// <li v-for="book in books">
// 	<BookPreview/>
// 	<button @click="removeBook1('book.id')">remove</button>
// </li>

// </ul> -->