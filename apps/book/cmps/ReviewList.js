import ReviewPreview from './ReviewPreview.js'

export default {
  props: ['reviews'],
  template: `
    <ul class="review-list clear-list ">
        <li v-for="review in reviews" :key="review.id" class="review-preview-container">
            <review-preview :review="review"  />
          <button @click.stop="remove(review.id)">✖</button>
        </li>
    </ul>
    `,
  methods: {
    remove(reviewId) {
      console.log('removing...')
      this.$emit('remove', reviewId)
    },
  },
  components: {
    ReviewPreview,
  },
}
