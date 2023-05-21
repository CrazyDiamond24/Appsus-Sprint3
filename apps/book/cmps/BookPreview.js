import { utilService } from '../../../services/util.service.js'

export default {
  name: 'book-preview',
  props: ['book'],
  template: `
    <article class="book-preview">
      <div class="book-img-container">
        <img class="book-img" :src="book.thumbnail || defaultImage" :alt="book.title" />
      </div>
      <h2>{{ book.title }}</h2>
      <div class="book-price" v-if="book.listPrice">{{ getPriceDisplay(book.listPrice) }}</div>
      <div class="book-buttons">
        <button class="btn btn-details">
          <RouterLink :to="'/book/'+book.id">Details</RouterLink> 
        </button>
        <button class="btn btn-remove" @click="$emit('remove', book.id)">Remove</button>
      </div>
    </article>
  `,
  data() {
    return {
      defaultImage: 'https://i.pinimg.com/236x/00/89/2b/00892b6dee6e288fda15e8e6d79ede37--vintage-book-covers-vintage-books.jpg'
    }
  },
  methods: {
    getPriceDisplay: utilService.getPriceDisplay,
  },
}
