import { svgService } from './../services/svg.service.js'

export default {
    template: `
        <section>
            <input v-html="getSvg('search')" @input="filterByTxt" v-model="filterBy" class="email-index-search-input" type="text" placeholder="Search mail">
        </section>
    `,
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
    },
}

