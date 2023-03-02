import { eventBus } from './../../../services/event-bus.service.js'
import { emailService } from './../services/email.service.js'
import { svgService } from '../services/svg.service.js'

export default {
    name: 'emailPreview',
    props: ['email'],
    template: `
        <div class="email-preview-container" @click="setDetails(this.email)" :class="{isRead:!email.isRead}">
            <input type="checkbox" class="email-preview-checkbox"/>
            <i class="check-star" v-html="getSvg('star')"></i>
            <p class="email-preview from">{{email.from}}</p>
            <div class="prev">
                <p class="email-preview subject">{{email.subject}}</p>
                <p class="email-preview body">{{email.body}}</p>
            </div>
            <p class="email-preview time">{{email.sentAt}}</p>
            <div class="email-preview icons">
                <i class="email-preview-icon archive" v-html="getSvg('archive')"></i>
                <i class="email-preview-icon delete" v-html="getSvg('delete')"></i>
                <i class="email-preview-icon markasread" v-html="getSvg('mark_as_read')"></i>
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
                //TODO: לעדכן את ה Trash
            } else {
                this.$emit('remove', email.id)
            }
        },  
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
    },
}