/* imports */
import { emailService } from './../services/email.service.js'
import { svgService } from '../services/svg.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    name: 'emailDetails',
    props:['emailId'],
    template: `
    <section className="email-details-container" v-if="email">
         <button class="email-details-arrow-btn" @click="backToMail" v-html="getSvg('back')"></button>
         <h1 class="email-details-subject">{{email.subject}}</h1>
         <h3 class="email-details-username">{{formatUsername}} </h3>
         <p class="email-details-from">&lt;{{formatMail}}</p>
         <p class="email-details-body">{{email.body}}</p>
    </section>
    `,
    data() {
        return {
            email:null,
            username:null,
        }
    },
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        backToMail() {
            eventBus.emit('backToMail')
        }
    },
    computed: {
        formatUsername(){
            const username = (this.email.from !== 'user@appsus.com') ? this.email.from.split("@")[0]:this.email.to.split("@")[0]
            return this.username = username
        },
        formatMail(){
            return (this.email.from !== 'user@appsus.com') ? this.email.from:this.email.to
        }
    },
    created() {
    if (this.emailId) {
        emailService.get(this.emailId)
            .then(email => {
                this.email = email
            })
    }
    },
}