export default {
  template: `
    <header class="app-header">
      <div class="logo-container">
      <RouterLink to="/">
        <img class="logo-img" src="./assets/img/A.png" alt="A">
        <img class="logo-img" src="./assets/img/P.PNG" alt="P">
        <img class="logo-img" src="./assets/img/P.PNG" style="margin-right: -5px;" alt="P">
        <img class="logo-img" src="./assets/img/S.PNG" alt="P">
        <img class="logo-img" src="./assets/img/U.PNG" style="margin-right: -5px;" alt="S">
        <img class="logo-img" src="./assets/img/S.PNG" alt="U">
</RouterLink>
      </div>
      <nav>
        <RouterLink v-for="(route, idx) in routes" :to="route.path" :title="route.title" :key="idx" exact-active-class="active-link">{{route.title}} </RouterLink>
      </nav>
    </header>
    `,
  data() {
    return {
      routes: [
        { path: '/', title: 'Home' },
        { path: '/notes', title: 'Notes' },
        { path: '/email/list', title: 'E-mail' },
        { path: '/book', title: 'Books' },
      ],
    }
  },
  methods: {
    setRoute(route) {
      this.$emit('set-route', route)
    },
  },
}
