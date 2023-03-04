import { eventBus } from './../../../services/event-bus.service.js'
import { emailService } from './../services/email.service.js'
import { svgService } from '../services/svg.service.js'
import { i18Service } from './../../../services/i18n.service.js'

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
            <p class="email-preview time">{{formatTime(email)}}</p>
            <div class="email-preview icons">
                <i class="email-preview-icon archive" @click="addToArchive" v-html="getSvg('archive')"></i>
                <i class="email-preview-icon delete" @click="addToTrash" v-html="getSvg('delete')"></i>
                <i class="email-preview-icon markasread" @click="addToRead" v-html="getSvg('mark_as_read')"></i>
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
        renderDetails(){
            console.log('renderDetails pre')
            this.$emit('renderDetails', this.email.id)
        },
        formatTime(email){
            return i18Service.formatTime(email.sentAt)
        },
        addToTrash(){
            this.email.isTrash = true
            console.log('addToTrash Prev')
            this.$emit('addToTrash')
        },
        addToArchive(){
            this.email.isArchive = true
            console.log('addToArchive Prev')
            this.$emit('addToArchive')
        },
        addToRead(){
            this.email.isRead = true
            console.log('addToRead Prev')
            this.$emit('addToRead', this.email.id)
        },
        setDetails(email) {
            console.log('Im in set Details')
            this.renderDetails()
            email.isRead = true
            emailService.saveEmail(email)
            this.$router.push(`/email/${email.id}`)
            //this.$emit('renderDetails', this.email.id)
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
        },
        /*******************************NEW ADDS */
        addToStars(){
            this.$emit('addToStars')
        },
    },
    components: {
        i18Service,
    },
}