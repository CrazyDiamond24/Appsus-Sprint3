export default {
  template: `
    <header class="app-header">
      <RouterLink to="/">
      <h2 class="temp-logo">Appsus</h2>
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
        { path: '/about', title: 'About' },
      ],
    }
  },
  methods: {
    setRoute(route) {
      this.$emit('set-route', route)
    },
  },
}




// <!-- <div class="logo-container">
// <img class="logo-img" src="./assets/img/A.png" alt="A"/>
// <img class="logo-img" src="./assets/img/P.png" alt="P"/>
// <img class="logo-img" src="./assets/img/P.png" style="margin-right: -5px;" alt="P"/>
// <img class="logo-img" src="./assets/img/S.png" alt="S"/>
// <img class="logo-img" src="./assets/img/U.png" style="margin-right: -5px;" alt="U"/>
// <img class="logo-img" src="./assets/img/S.png" alt="S"/>
// </div> -->