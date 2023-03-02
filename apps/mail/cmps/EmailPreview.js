import { eventBus } from './../../../services/event-bus.service.js'
import { emailService } from './../services/email.service.js'
import { svgService } from '../services/svg.service.js'

export default {
    name: 'emailPreview',
    props: ['email'],
    template: `
        <div class="email-preview-container" @click="setDetails(this.email)" :class="{isRead:!email.isRead}">
            <input type="checkbox" class="email-preview-checkbox"/>
            <i :key="email.id" :style="styleStar" class="check-star" v-html="getSvg('star')" @click="addToStars(this.email)"></i>
            <p class="email-preview from">{{email.from}}</p>
            <div class="prev">
                <p class="email-preview subject">{{email.subject}}</p>
                <p class="email-preview body">{{email.body}}</p>
            </div>
            <p class="email-preview time">{{email.sentAt}}</p>
            <div class="email-preview icons">
                <i class="email-preview-icon archive" v-html="getSvg('archive')"></i>
                <i class="email-preview-icon delete" @click="remove(email.id)" v-html="getSvg('delete')"></i>
                <i class="email-preview-icon markasread" v-html="getSvg('mark_as_read')"></i>
            </div>
        </div>
    `,
    data(){
        return {
            styleStar: {
                fill: null,
            }
        } 
    },
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
        remove(id){
            emailService.remove(id)
            //add to trash
        },
        addToStars(email){
            console.log('EmailPreview: addToStars')
            this.styleStar.fill = 'rgb(255, 191, 14)'
            emailService.addToStars(email)
        }
    },
}