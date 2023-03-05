/* imports */
import { emailService } from './../services/email.service.js'
import { svgService } from './../services/svg.service.js'
import { eventBus } from './../../../services/event-bus.service.js'
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
        @addToRead="addToRead"/>

        <emailDetails
        v-if="emailId" 
        :emailId="emailId"/>
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
        backToMail(){
            this.emailId = ''
        },
        /*updateAllEmails(){
            console.log('INDEX updateAllEmails')
            emailService.query()
                .then(e => this.allEmails = e)
        },*/
        updateSpace(locationPage){
            console.log('INDEX updateSpace' + locationPage)
            this.space = locationPage
        },
        addEmail(myEmail){
            console.log(' addEmail INDEX: ' )
            console.dir(myEmail)
            emailService.saveEmail(myEmail, false)
                .then(e => this.allEmails.push(e))
                console.log(this.allEmails)
            this.updateIn()
            /*.then(() => {
                eventBus.emit('showMsg', 'Send successfully')
                eventBus.emit('refresh')
            })*/
        },
        filterByTxt(myFilter){
            console.log('filterByTxt INDEX, myFilter:'+ myFilter)
            const regex = new RegExp(myFilter, 'i')
            this.emails = this.emails.filter(email => regex.test(email.body) || regex.test(email.subject) || regex.test(email.from) || regex.test(email.to))
        }
    },
    created() {
        emailService.query()
            .then(emails => this.emails = emails)

        emailService.query()
            .then(e => this.allEmails = e)

        eventBus.on('filterByTxt', this.filterByTxt)
        eventBus.on('addToDrafts', this.addToDrafts)
        eventBus.on('addEmail', this.addEmail)
        eventBus.on('renderSent', this.renderSent)
        eventBus.on('renderStars', this.renderStars)
        eventBus.on('addToStars', this.addToStars)
        eventBus.on('renderDetails', this.renderDetails)
        eventBus.on('backToMail', this.backToMail)
        //eventBus.on('updateAllEmails', this.updateAllEmails)
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

