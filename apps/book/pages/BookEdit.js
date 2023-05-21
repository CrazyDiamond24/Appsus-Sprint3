import { bookService } from "../services/book.service.js"

export default {
    template: `
        <section class="book-edit">
            <h2>Add a book</h2>
            <form @submit.prevent="save">
                <input type="text" v-model="book.title" placeholder="Book title">
                <input type="number" v-model.number="book.listPrice" placeholder="Book price">
                <button>Save</button>
            </form>
        </section>
    `,
data() {
    return {
        book: {
            title: '',
            price: null, // Set initial value to null or undefined
        }
    }
},

    methods: {
        save() {
            bookService.save(this.book)
                .then(savedBook => {
                    this.book = bookService.getEmptyBook()
                    this.$emit('book-saved', savedBook)
                })
        }
    }
}