// import { utilService } from './util.service.js'
import { modalService } from '../services/modal-service.js'
import { bookService } from '../services/book.service.js'
// import { eventBusService } from '../services/event-bus.service.js'

export default {
    template: `
        <section class="add-book">
            <div class="main-screen" @click="toggleScreen"></div>
          <div class="input-container flex center align-center">
                <input type="text" placeholder="Search online..." v-model.trim="searchTerm">
                <button @click="search">Go</button>
                </div>
            <div ref="modal" class="modal fade-out" >
            <button @click="toggleScreen">X</button>
            
            <div class="modal-container">
            <ul class="clean-list res-list">
            <li v-for="book in books" :key="book.id">
            <p>{{book.volumeInfo.title}}</p>
            <button @click="addBook(book)" class="btn-add-book">Add</button>
            <hr>
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
    created() {

    },
    mounted() {


    },
    methods: {
        search() {
            if (!this.searchTerm) return
            bookService.searchBook(this.searchTerm)
                .then(res => {
                    this.searchTerm = ''
                    modalService.toggleModal(true, this.$refs.modal)
                    this.books = res
                })
        },
        toggleScreen() {
            modalService.toggleModal(false, this.$refs.modal)
        },
        addBook(googleBook) {
          bookService.addGoogleBook(googleBook)
            .then(book => {
              this.$emit('added', book)
            })
            .catch(err => {
              console.error(err)
            })
        }
},
    computed: {

    },
    unmounted() {

    },
}