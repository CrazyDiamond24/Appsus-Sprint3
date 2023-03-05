/* imports */
import { emailService } from './../services/email.service.js'
import { svgService } from '../services/svg.service.js'
import { i18Service } from './../../../services/i18n.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    name: 'emailPreview',
    props: ['email'],
    template: `
        <div class="email-preview-container" :class="{isRead:!email.isRead}">
            <input type="checkbox" class="email-preview-checkbox"/>
            <i :key="email.id" :style="styleStar" class="check-star" v-html="getSvg('star')" @click="orgStars"></i>
            <p class="email-preview from" @click="setDetails(this.email)">{{email.from}}</p>
            <div class="prev">
                <p class="email-preview subject" @click="setDetails(this.email)">{{email.subject}}</p>
                <p class="email-preview body" @click="setDetails(this.email)">{{email.body}}</p>
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
            console.log('renderDetails pre '+ this.email.id)
            eventBus.emit('renderDetails', this.email.id)
            //this.$emit('renderDetails', this.email.id)
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
            //this.$router.push(`/email/${email.id}`)
            //this.$emit('renderDetails', this.email.id)
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        remove(id){
            emailService.remove(id)
            //add to trash
        },
        /*******************************NEW ADDS */
        orgStars(){
            if(this.email.isStar){
                this.email.isStar = false
                eventBus.emit('removeFromStars')
                this.styleStar.fill = null
                eventBus.emit('addToStars')
            } else {
                this.email.isStar = true
                eventBus.emit('addToStars')
                this.styleStar.fill = 'gold'
            }
            
        },
    },
    components: {
        i18Service,
    },
}