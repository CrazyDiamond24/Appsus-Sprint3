// import { getPriceDisplay } from '../../../services/util.service.js'
import LongText from '../cmps/LongText.js'
// import UserMsg from '../cmps/UserMsg.js'

import { bookService } from '../services/book.service.js'
// import { eventBusService } from '../../../services/event-bus.service.js'

import ReviewAdd from '../cmps/ReviewAdd.js'
import ReviewList from '../cmps/ReviewList.js'

export default {
	template: `
    <div v-if="book">
    <!-- <div class="overlay" v-show="showOverlay"></div> -->
<section class="book-details">
  <table>
    <tbody>
      <tr>
        <td class="thumbnail-td">
          <img class="details-img" :src="book.thumbnail" :alt="book.title" />
          <button class="close-btn" @click="closeDetails">Close</button>
          <span v-if="book.listPrice && book.listPrice.isOnSale" class="on-sale-label"></span>
        </td>
        <td class="details-td" colspan="2">
          <h2>{{ book.title }}</h2>
          <table>
            <tbody>
              <tr>
                <td>Title:</td>
                <td>{{ book.title }}</td>
              </tr>
              <tr>
                <td>Subtitle:</td>
                <td>{{ book.subtitle }}</td>
              </tr>
              <tr>
                <td>Authors:</td>
                <td>{{ book.authors.join(', ') }}</td>
              </tr>
              <tr>
                <td>Published Date:</td>
                <td>{{ book.publishedDate }} <span>{{publishDateInfo}}</span></td>
              </tr>
              <tr>
                <td>Description:</td>
                <td> <LongText :txt="book.description" /> </td>
                <!-- <td>{{ book.description }}</td> -->
              </tr>
              <tr>
                <td>Page Count:</td>
                <td>{{ book.pageCount }} <span>{{lengthInfo}}</span></td>
              </tr>
              <tr>
                <td>Categories:</td>
                <td>{{ book.categories.join(', ') }}</td>
              </tr>
              <tr>
                <td>Language:</td>
                <td>{{ book.language }}</td>
              </tr>
              <tr>
                <td>List Price:</td>
                <td v-if="book.listPrice">
                  <span :class="{ 'red': book.listPrice.amount > 150, 'green': book.listPrice.amount < 20 }"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <ReviewAdd @sentReview="addReview" ></ReviewAdd>
    <ReviewList :reviews="getBookReviews" @remove="removeReview" > </ReviewList>
</section>
<!-- <user-msg></user-msg> -->
</div>
    `,
	data() {
		return {
			book: null,
			// showOverlay: true,
		}
	},
	created() {
		console.log('bookId Changed!', this.$route.params)
		this.loadBook()
	},
	watch: {
		bookId() {
			console.log('bookId Changed!')
			this.loadBook()
		},
	},
	methods: {
		loadBook() {
			bookService
				.get(this.bookId)
				.then(book => (this.book = book))
				.catch(console.log)
		},
		closeDetails() {
			// this.showOverlay = false
			this.$emit('hide-details')
		},
		// getPriceDisplay,
		addReview(review) {
			bookService
				.addReview(this.book.id, review)
				.then(book => {
					this.book = book
					eventBusService.emit('show-msg', {
						txt: 'review added',
						type: 'success',
					})
					eventBusService.emit('book-updated', book)
				})
				.catch(err => {
					eventBusService.emit('show-msg', {
						txt: 'review failed',
						type: 'error',
					})
				})
		},
		removeReview(reviewId) {
			bookService.removeReview(this.book.id, reviewId).then(book => {
				eventBusService.emit('show-msg', {
					txt: 'review removed',
					type: 'success',
				})
				eventBusService.emit('book-updated', book)
			})
		},
	},
	components: {
		LongText,
		ReviewAdd,
		ReviewList,
		// UserMsg,
	},
	computed: {
		bookId() {
			return this.$route.params.bookId
		},
		lengthInfo() {
			const pageCount = this.book.pageCount

			if (pageCount > 500) return 'Serious read'
			if (pageCount > 200) return 'Decent read'
			return 'Light read'
		},
		publishDateInfo() {
			const publishDate = this.book.publishedDate
			const date = new Date()
			const currYear = date.getFullYear()

			if (currYear - publishDate > 10) return 'Vintage'
			if (currYear - publishDate <= 1) return 'New'
		},
		setPriceColor() {
			const price = this.book.listPrice.amount
			return { red: price > 150, green: price < 20 }
		},
		isOnSale() {
			return this.book.listPrice.isOnSale
		},
		getBookReviews() {
			return this.book.reviews
		},
	},
}
