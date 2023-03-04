import { svgService } from './../services/svg.service.js'

export default {
    template: `
        <section class="email-filter-container">
            <label>
                <input @input="filterByTxt" v-model="filterBy" class="email-filter-search-input" type="search" placeholder="Search mail">
            </label>
        </section>
    `,
    data(){
        return{
            placehold: ''
        }
    },
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
    },
}

