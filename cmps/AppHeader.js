export default {
	template: `
        <header class="app-header">
            <h1>AppSus</h1>
            <nav>
                <RouterLink v-for="(route, idx) in routes" :to="route.path" 
                :title="route.title" :key="idx">{{route.title}} </RouterLink> 
            </nav>
        </header>
    `,
    data(){
        return{
            routes: [
                 {path:'/', title:'Home'},
                 {path:'/notes', title:'Notes'},
                 {path:'/email/list', title:'E-mail'},
             ]
     
         }
    },
    methods: {
        setRoute(route) {
            this.$emit('set-route', route)
        }
    }

}