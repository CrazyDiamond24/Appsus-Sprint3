export default {
  template: `
  <section class="book-filter">
    <input v-model="filterBy.title" @input="filter" placeholder="Search" type="text" />
    <label for="min-price">Min Price:</label>
    <input
      id="min-price"
      v-model.number="filterBy.minPrice"
      @input="filter"
      type="range"
      min="0"
      max="200"
      step="1"
    />
    <span>{{ filterBy.minPrice }}</span>
        </section>
    `,
  data() {
    return {
      filterBy: { title: '', minPrice: 0 },
    }
  },
  methods: {
    filter() {
      this.$emit('filter', {...this.filterBy})
    },
  },
}
