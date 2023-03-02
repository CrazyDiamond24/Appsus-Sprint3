import { emailService } from './../services/email.service.js'

import emailFilter from './../cmps/EmailFilter.js'
import emailList from './../cmps/EmailList.js'
import emailCompose from './../cmps/EmailCompose.js'

export default {
    name: 'emailIndex',
    template: `
    <section class="email-index">
    <div class="email-filter">
    </div>

    <!---<div class="main-view">
    <RouterView />
    </div>-->
    </section>

    <section>
    <emailCompose />
    </section>

    <section>
    <emailList :emails="emails" v-if="emails"/>
    </section>
    `,
    data() {
        return {
            emails: null,
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
    created() {
        //this.emails = emailService.query()
        emailService.query()
            .then(emails => this.emails = emails)
    },
    components: {
        emailFilter,
        emailList,
        emailCompose,
        //emailPreview
    },
}
