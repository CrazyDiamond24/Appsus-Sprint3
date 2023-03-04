export default {
  template: `
    <header class="app-header">
      <RouterLink to="/">
        <div class="logo-container">
        <img class="logo-img" src="./assets/img/A.png" alt="A"/>
        <img class="logo-img" src="./assets/img/P.png" alt="P"/>
        <img class="logo-img" src="./assets/img/P.png" style="margin-right: -5px;" alt="P"/>
        <img class="logo-img" src="./assets/img/S.png" alt="P"/>
        <img class="logo-img" src="./assets/img/U.png" style="margin-right: -5px;" alt="S"/>
        <img class="logo-img" src="./assets/img/S.png" alt="U"/>
      </div>
    </RouterLink>
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
