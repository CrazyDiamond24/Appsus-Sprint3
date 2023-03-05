/* imports */
import { emailService } from './../services/email.service.js'

export default {
    props:['emailId'],
    template: `
    <section className="email-details" v-if="email">
         <button class="arrow-btn">Back</button>
         <h1 class="subject">{{email.subject}}</h1>
         <h3 class="username">{{formatUsername}} </h3>
         <p class="mail-from">&lt;{{formatMail}}</p>
         <p class="mail-body">{{email.body}}</p>
    </section>
    `,
    data() {
        return {
            email:null,
            username:null,
        }
    },
    methods: {

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