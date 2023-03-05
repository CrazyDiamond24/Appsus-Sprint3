/* imports */
import { eventBus } from "./../../../services/event-bus.service.js"

export default {
    name: 'emailFilter',
    template: `
        <section class="email-filter-container">
            <label>
                <input v-model="filter" @input="filterByTxt" v-model="filterBy" class="email-filter-search-input" type="search" placeholder="Search mail">
            </label>
        </section>
    `,
    data(){
        return{
            filter: '',
        }
    },
    methods: {
        filterByTxt() {
            console.log('filterByTxt EmailFilter, this.filter: '+ this.filter)
            eventBus.emit('filterByTxt', this.filter)
            this.filter = ''
        },
        
    },
}

