export default {
  props: {
    value: String,
  },
  template: `
  <div class="color-picker-cmp">
    <div class="colors">
      <div v-for="(color, index) in colors" :key="index" :style="{ backgroundColor: color }" @click="setColor(color)"></div>
    </div>
  </div>
  `,
  data() {
    return {
      colors: [
        '#ffffff',
        '#f28b82', //coral
        '#fbbc04', //orange
        '#fff475', //yellow
        '#ccff90', //green
        '#a7ffeb', //blue
        '#cbf0f8', //light blue
        '#aecbfa', //sky blye
        '#d7aefb', // purple
        '#fdcfe8', //pink
        '#e6c9a8', //beige
        '#e8eaed',
      ],
    }
  },
  methods: {
    setColor(color) {
      this.$emit('input', color)
    },
  },
}
