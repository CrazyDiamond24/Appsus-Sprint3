// import { getPriceDisplay } from '../../../services/util.service.js'

export default {
  name:'book-preview',
	props: ['book'],
	template: `
      <article class="book-preview">
        <h2>{{ book.title }}</h2>
        <img alt="" :src="book.thumbnail" />
        <div v-if="book.listPrice"></div>
      
        <button>
        <RouterLink :to="'/book/'+book.id">Details</RouterLink> 
        </button>
        <button @click="$emit('remove', book.id)">Remove</button>
      </article>
    `,
	methods: {
		// getPriceDisplay,
	},
}
