import { bookService } from '../services/book.service.js'
// import { eventBusService } from '../../../services/event-bus.service.js'

import BookFilter from '../cmps/BookFilter.js'
import BookList from '../cmps/BookList.js'
import AddBook from '../cmps/AddBook.js'
import BookDetails from './BookDetails.js'
import BookEdit from './BookEdit.js'
// import UserMsg from '../cmps/UserMsg.js'

export default {
  name: 'BookIndex',
  template: `
        <section class="book-index">
            <BookFilter @filter="setFilterBy"/>
			<RouterLink to="/book/add" class="book-nav">
        <button title="Go To Search" class="btn-search-toggle" @click="onSearch = !onSearch">
         Google Search
        </button>
        </RouterLink>
            <BookList 
                :books="filteredBooks" 
                v-if="books"
                @remove="removeBook" 
                @show-details="showBookDetails" />
            <BookEdit @book-saved="onSaveBook"/>
			<!-- <div class="flex align-center center"> -->

          
                <!-- <user-msg></user-msg> -->
        </section>
    `,
  data() {
    return {
      books: null,
      selectedBook: null,
      filterBy: {},
      onSearch: false,
    }
  },
  methods: {
    removeBook(bookId) {
      bookService.remove(bookId).then(() => {
        const idx = this.books.findIndex((book) => book.id === bookId)
        this.books.splice(idx, 1)
      })
    },
    showBookDetails(bookId) {
      this.selectedBook = this.books.find((book) => book.id === bookId)
    },
    onSaveBook(newBook) {
      this.books.unshift(newBook)
    },
    setFilterBy(filterBy) {
      this.filterBy = filterBy
    },
    updateBook(book) {
      const idx = this.books.findIndex((b) => b.id === book.id)
      this.books.splice(idx, 1, book)
    },
    hideBookDetails() {
      this.selectedBook = null
    },
    updateBooks() {
      bookService.query().then((books) => {
        this.books = books
      })
    },
  },
  computed: {
    filteredBooks() {
      const regex = new RegExp(this.filterBy.title, 'i')
      return this.books.filter(
        (book) =>
          regex.test(book.title) &&
          (!this.filterBy.minPrice ||
            book.listPrice.amount >= this.filterBy.minPrice)
      )
    },
  },

  created() {
    bookService.query().then((books) => (this.books = books))

    // eventBusService.on('book-updated', (updatedBook) => {
    //   const idx = this.books.findIndex((book) => book.id === updatedBook.id)
    //   if (idx !== -1) {
    //     this.books.splice(idx, 1, updatedBook)
    //   }
    //   if (this.selectedBook && this.selectedBook.id === updatedBook.id) {
    //     this.selectedBook = updatedBook
    //   }
    // })
  },
  components: {
    BookFilter,
    BookList,
    BookDetails,
    BookEdit,
    // UserMsg,
    AddBook,
  },
}
