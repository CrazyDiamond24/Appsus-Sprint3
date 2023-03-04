import { emailService } from './../services/email.service.js'
import { svgService } from './../services/svg.service.js'

import emailFilter from './../cmps/EmailFilter.js'
import emailSideBar from './../cmps/EmailSideBar.js'
import emailList from './../cmps/EmailList.js'
import emailCompose from './../cmps/EmailCompose.js'

export default {
    name: 'emailIndex',
    template: `
    <section class="email-index">
        <section>
            <header class="email-index-header">
                <article class="email-index-search-menu">
                    <i v-html="getSvg('menu')"></i>
                    <img src="./../../../assets/img/logo.png">
                    <h1>Mail</h1>
                </article>
        </section>

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
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
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
        emailSideBar
        //emailPreview
    },
}
