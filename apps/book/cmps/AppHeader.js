export default {
    template: `
        <header class="app-header">
        <img src="../assets/img/logo.png" alt="Logo" class="logo" />
            <nav>
                <RouterLink v-for="(route, idx) in routes" :to="route.path" 
                :title="route.title" :key="idx">{{route.title}} </RouterLink> 
            </nav>
        </header>
    `,

    data(){
        return{
           routes: [
                {path:'/home', title:'Home'},
                {path:'/book', title:'Books'},
                {path:'/about', title:'About'},
            ]

        }
    },
    methods: {
        setRoute(route) {
            this.$emit('set-route', route)
        }
    }
}