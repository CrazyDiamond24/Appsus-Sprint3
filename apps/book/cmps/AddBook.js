// import { utilService } from './util.service.js'
import { modalService } from '../services/modal-service.js'
import { bookService } from '../services/book.service.js'
// import { eventBusService } from '../services/event-bus.service.js'

export default {
  template: `
        <section class="add-book">
            <div class="input-container flex center align-center">
                <input type="text" placeholder="Search online..." v-model.trim="searchTerm">
                <button @click="search">Go</button>
            </div>
            
            <div class="book-modal-container">
                <div ref="modal" class="book-modal fade-out">
                    <ul class="clean-list res-list">
                        <li v-for="book in books" :key="book.id">
                            <div class="book-details-google">
                                <img class="book-cover-google" :src="getThumbnail(book)" alt="Book Thumbnail">
                                <p class="book-title-google">{{ book.volumeInfo.title }}</p>
                            </div>
                            <button @click="addBook(book)" class="btn-add-book">Add</button>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    `,
  data() {
    return {
      searchTerm: null,
      books: null,
    }
  },
  methods: {
    search() {
      if (!this.searchTerm) return
      bookService.searchBook(this.searchTerm).then((res) => {
        this.searchTerm = ''
        modalService.toggleModal(true, this.$refs.modal)
        this.books = res
      })
    },
    toggleScreen() {
      modalService.toggleModal(false, this.$refs.modal)
    },
    addBook(googleBook) {
      bookService
        .addGoogleBook(googleBook)
        .then((book) => {
          this.$emit('added', book)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    getThumbnail(book) {
      if (book && book.volumeInfo && book.volumeInfo.imageLinks) {
        return book.volumeInfo.imageLinks.thumbnail
      }
      return 'https://cover2coverbookdesign.com/site/wp-content/uploads/2019/03/geometric1.jpg'
    },
  },
}
