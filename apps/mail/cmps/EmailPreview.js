import { eventBus } from './../../../services/event-bus.service.js'
import { emailService } from './../services/email.service.js'

export default {
    name: 'emailPreview',
    props: ['email'],
    template: `
        <div class="email-preview" @click="setDetails(this.email)" :class="{isRead:email.isRead}">
            <div class="check-star">
                <!-- TODO: star svg here -->
            </div>
            <div class="email-preview-from">{{email.from}}</div>
            <div class="email-preview-subject">{{email.subject}}</div>
            <div class="email-preview-body">{{email.body}}</div>
            <div class="email-preview-time">{{email.sentAt}}</div>
            <div class="email-preview-icons">
              <!-- TODO: svg here :hover -->
           </div>
        </div>
    `,
    methods: {
        setDetails(email) {
            email.isRead = true
            emailService.saveEmail(email)

            this.$router.push(`/email/${email.id}`)
        },
        deleteEmail(email) { //לשייך לכפתור-אייקון מחיקה
            if (!email.isTrash) {
                email.isTrash = true
                emailService.saveEmail(email)
            } else {
                this.$emit('remove', email.id)
            }
        },  
    },
}