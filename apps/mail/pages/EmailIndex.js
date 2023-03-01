/*import { utilService } from './utils.service.js'
import { storageService } from './storage.service.js'
import { crudService } from './crud.service.js'*/

import emailFilter from './../cmps/EmailFilter.js'
//import emailList from '../cmps/EmailList.js'
import emailCompose from './../cmps/EmailCompose.js'

export default {
    name: 'emailIndex',
    template: `
    <section class="email-index">
    <div class="email-filter">
    </div>

    <div class="main-view">
    <RouterView />
    </div>

    <email-compose />
    </section>
    `,
    data() {
        return {
            email: null,
            selectedEmail: null
        }
    },
    methods: {
        selectEmail(email) {
            this.selectedEmail = email
        },
        backToList() {
            this.selectedEmail = null
        },
    },
    components: {
        emailFilter,
        //emailList,
        emailCompose,
        //emailPreview
    },
}