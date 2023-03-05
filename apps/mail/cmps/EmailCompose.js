/* imports */
import { emailService } from './../services/email.service.js'
import { eventBus } from './../../../services/event-bus.service.js'
import { svgService } from './../services/svg.service.js'

export default {
    name: 'emailCompose',
    template: `
    <button class="email-compose-btn" @click="openModal" v-html="getSvg('compose_edit')"></button>
    <form class="email-compose-container" v-show='this.isActivated'>
        <header>New Message <div class="email-compose-close" @click="addToDrafts" v-html="getSvg('close')"></div></header>
        <div class="email-compose-body">
            <input type="email" placeholder="To" v-model="newEmail.to">
            <input type="text" placeholder="Subject" v-model="newEmail.subject">
            <textarea v-model="newEmail.body" class="email-compose-body-textarea"></textarea>
            <button @click="checkCompose" class="email-compose-send-btn">Send</button>
        </div>
    </form>
    `,
    data() {
        return {
            isActivated: false,
            newEmail: {},
        }
    },
    methods: {
        addToDrafts(){
            this.closeModal()
            this.newEmail.isDraft = true
            this.addEmail()
            //this.$emit('addToDrafts', this.newEmail)
            eventBus.emit('addToDrafts')
        },
        checkCompose() {
            if (!this.newEmail.to) {
                alert('Error: Please specify at least one recipient.')
                return
            }
            if (!this.newEmail.subject && !this.newEmail.body){
                var boolSend = confirm('Send this message without a subject or text in the body?')
                if(!boolSend) return
                else {
                    this.newEmail.subject = '(no subject)'
                    this.sendEmail()
                }
            }
            else this.sendEmail()
        },
        openModal() {
            this.setNewEmptyEmail()
            this.isActivated = true
        },
        closeModal() {
            this.isActivated = false
        },
        addEmail(){
            console.log('addEmail SIDE BAR ')
            //this.$emit('addEmail', this.email)
            eventBus.emit('addEmail', this.newEmail)
        },
        sendEmail() {
            this.closeModal()
            this.newEmail.isSent = true
            this.newEmail.isRead = false
            this.newEmail.sentAt = Date.now()
            this.addEmail()
        },
        setNewEmptyEmail() {
            this.newEmail = emailService.getEmptyEmail()
        },
        addMail(){
            this.closeModal()
            this.newEmail.isSent = true
            this.newEmail.isDraft = false
            this.newEmail.sentAt = Date.now()
            emailService.saveEmail(this.NewEmail, false)
            .then(() => {
                eventBus.emit('showMsg', 'Send successfully')
                eventBus.emit('refresh')
            })
            this.NewEmail = emailService.getEmptyEmail()
        },
        getSvg(iconName) {
            if(iconName === 'compose_edit') return svgService.getSvg(iconName) + ' Compose'
            return svgService.getSvg(iconName)
        },
    },
}