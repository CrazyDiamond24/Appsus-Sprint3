import { emailService } from './../services/email.service.js'
import { svgService } from './../services/svg.service.js'

import emailFilter from './../cmps/EmailFilter.js'
import emailSideBar from './../cmps/EmailSideBar.js'
import emailList from './../cmps/EmailList.js'
import emailCompose from './../cmps/EmailCompose.js'
import emailPreview from './../cmps/EmailPreview.js'
import emailDetails from './EmailDetails.js'

export default {
    name: 'emailIndex',
    props: ['email', 'emails'],
    template: `
    <section class="email-index">
        <section>
        <emailSideBar
        @renderTrash="renderTrash"
        @renderInbox="renderInbox"
        @renderDrafts="renderDrafts"
        @renderStars="renderStars"
        @renderAllEmails="renderAllEmails"
        @addToDrafts="addToDrafts"
        @addEmail="addEmail"
        @updateSpace="updateSpace"
        @addEmail="addEmail"/>
        </section>

        <section>
        <emailList :emails="emails" v-if="emails && !emailId" 
        @addToStars="addToStars" 
        @addToTrash="addToTrash"
        @addToArchive="addToArchive"
        @addToRead="addToRead"
        @renderDetails="renderDetails(id)"/>

        <emailDetails
        v-if="emailId" 
        :emailId="emailId"
        @back="back"/>
        </section>
    </section>
    `,
    data() {
        return {
            emails: null,
            email: null,
            emailId: '',
            allEmails: null,
            space: '',
        }
    },
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        renderSent() {
            console.log('renderSent INDEX')
            this.emails = this.allEmails.filter(
                (email) => email.isSent
            )
        },
        renderTrash() {
            console.log('renderTrash INDEX')
            this.emails = this.allEmails.filter(
                (email) => email.isTrash
            )
        },
        renderInbox() {
            console.log('renderInbox INDEX')
            this.emails = this.allEmails.filter(
                (email) => !email.isTrash && email.from !== 'user@appsus.com' && !email.isArchive
            )
        },
        renderDrafts() {
            console.log('renderDrafts INDEX')
            this.emails = this.allEmails.filter(
                (email) => email.isDraft
            )
        },
        renderStars() {
            console.log('renderStars INDEX')
            this.emails = this.allEmails.filter(
                (email) => email.isStar
            )
        },
        renderAllEmails() {
            console.log('renderAllEmails INDEX')
            this.emails = this.allEmails
        },
        addToTrash(){
            console.log('addToTrash INDEX')
            this.updateIn()
        },
        addToDrafts(){
            console.log('addToDrafts INDEX')
            this.updateIn()
        },
        addToStars(){
            console.log('addToStars INDEX')
            this.updateIn()
        },
        addToArchive(){
            console.log('addToArchive INDEX')
            this.updateIn()
        },
        addToRead(id){
            console.log('addToRead INDEX')
            this.updateIn()
        },
        renderDetails(id){
            console.log('renderDetails INDEX')
            this.emailId = id
        },
        updateIn(){
            console.log('INDEX updateIn' + this.space)
            switch(this.space) {
                case 'inboxSpace':
                    this.renderInbox()
                  break;
                case 'sentSpace':
                    this.renderSent()
                  break;
                case 'trashSpace':
                    this.renderTrash()
                  break;
                case 'draftSpace':
                    this.renderDrafts() 
                  break;
                case 'starSpace':
                    this.renderStars()
                  break;
                case 'allSpace':
                    this.renderAllEmails()
                  break;
                default:
                    this.renderInbox()
            }
        },
        updateSpace(locationPage){
            console.log('INDEX updateSpace' + locationPage)
            this.space = locationPage
        },
        addEmail(email){
            console.log(' addEmail INDEX')
            emailService.saveEmail(email, false)
            this.updateIn()
            /*.then(() => {
                eventBus.emit('showMsg', 'Send successfully')
                eventBus.emit('refresh')
            })*/
        },
    },
    created() {
        emailService.query()
            .then(emails => this.emails = emails)
        emailService.query()
            .then(emails => this.allEmails = emails)
    },
    components: {
        emailFilter,
        emailList,
        emailCompose,
        emailSideBar,
        emailPreview,
        emailDetails
    },
}

