import { emailService } from './../services/email.service.js'

export default {
    props:['emailId'],
    template: `
    <section className="mail-details" v-if="email">
         <button class="arrow-btn" @click="back"><-</button>
         <h1 class="subject">{{email.subject}}</h1>
         <h3 class="username">{{formatUsername}} </h3>
          <!-- <div className="mail-details-buttons">
              <button class="star" ><i class="fa-regular fa-star"></i></button>
              <button title="save as a note"><i class="fa-solid fa-paper-plane"></i></button>
              <button title="delete" @click="removeMail(mail.id)"><i class="fa-regular fa-trash-can"></i></button>
         </div>-->
         <!-- <p class="mail-from">&lt;{{mail.from}}></p> -->
         <p class="mail-from">&lt;{{formatMailFromTo}}></p>
         <p class="mail-body">{{email.body}}</p>
         <!-- <pre>{{mail}}</pre> -->
    </section>
    `,
    data() {
        return {
            email:null,
            username:null,
        }
    },
    methods: {
        back(){
            //this.$emit('back')
            console.log('back')
        }
    },
    computed: {
        formatUsername(){
            const username = (this.email.from !== 'user@appsus.com') ? this.email.from.split("@")[0]:this.email.to.split("@")[0]
            return this.username = username
        },
        formatMailFromTo(){
            return (this.email.from !== 'user@appsus.com') ? this.email.from:this.email.to
        }
    },
    created() {
    if (this.emailId) {
        emailService.get(this.emailId)
            .then(mail => {
                // this.$emit('changeIsRead',true, mailId)
                // mail.isRead=true
                this.email = email
            })
    }
    },
}