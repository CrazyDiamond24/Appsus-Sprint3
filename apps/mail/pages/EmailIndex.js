import { emailService } from './../services/email.service.js'

import emailFilter from './../cmps/EmailFilter.js'
import emailSideBar from './../cmps/EmailSideBar.js'
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
        

        <section>
        <emailCompose 
        @addToDrafts="addToDrafts"/>
        <emailSideBar
        @renderTrash="renderTrash"
        @renderInbox="renderInbox"
        @renderDrafts="renderDrafts"
        @renderStars="renderStars"/>
        </section>

        <section>
        <emailList :emails="emails" v-if="emails"/>
        </section>
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
        renderTrash() {
            emailService.queryTrash()
                .then(emails => this.emails = emails)
        },
        renderInbox() {
            emailService.query()
                .then(emails => this.emails = emails)
        },
        renderDrafts() {
            emailService.queryDrafts()
                .then(emails => this.emails = emails)
        },
        renderStars() {
            emailService.queryStars()
                .then(emails => this.emails = emails)
        },
        addToDrafts(email) {
            emailService.addToDrafts(email)
        }
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
        emailSideBar
        //emailPreview
    },
}
