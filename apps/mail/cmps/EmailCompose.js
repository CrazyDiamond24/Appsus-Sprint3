import { emailService } from "../services/email.service"

export default {
    template: `
    <button @click="openModal">Compose</button>
    <form class="email-compose-container" v-show='this.isActivated'>
        <header>New Message <div class="close-compose" @click="closeModal" @click="saveInDrafts">x</div></header>
        <div class="secondary-content">
            <input type="text" placeholder="To" v-model="newEmail.to">
            <input type="text" placeholder="Subject" v-model="newEmail.subject">
            <input type="text" v-model="newEmail.body">
            <button @click="checkCompose" @click="addMail">Send</button>
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
        checkCompose() {
            if (!this.newEmail.to) {
                alert('Error: Please specify at least one recipient.')
                return
            }
            if (!this.newEmail.subject && !this.newEmail.body){
                var boolSend = confirm('Send this message without a subject or text in the body?')
                if(!boolSend) return
                else this.addMail()
            }
        },
        openModal() {
            setNewEmptyEmail()
            this.isActivated = true
        },
        closeModal() {
            this.isActivated = false
        },
        setNewEmptyEmail() {
            emailService.getEmptyEmail().then(res => this.newEmail = res)
        },
        addMail(){
            closeModal()
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
        saveInDrafts(){
            this.newEmail.isSent = false
            this.newEmail.isDraft = true
            console.log('TODO save in drafts') /*************************TODO************************** */
        }
    },
}