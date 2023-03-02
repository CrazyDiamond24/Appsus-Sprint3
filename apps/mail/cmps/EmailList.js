/*export default {
    template: `
        <section>
            <h2>List</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis enim rem porro delectus. Quos expedita ipsam repellendus voluptas quas, nam ea eligendi veniam ullam, modi impedit eveniet quia quaerat molestias?</p>
        </section>
    `,
}*/
import { emailService } from './../services/email.service.js'
import emailPreview from './EmailPreview.js'

export default {
    name: 'emailList',
    props: ['emails'],
    template:`
        <section class="email-list-main">

            <div class="email-list-search">
                <!-- TODO: svg here search icon -->
                <input @input="filterByTxt" v-model="filterBy" class="email-list-search-input" type="text" placeholder="Search mail">
            </div>
            
        <ul>
            <li v-for="email in emails" :key="email.id" class="email-list-container" @click="select(email.id)" >
                <emailPreview :email="email" @remove="deleteEmail"/>
            </li>
        </ul>
        </section>
    `,
    data(){
        return{
            filterBy: '', /*********TODO: לטפל בחיפוש */
            email: null,  
        }
    },
    methods: {
        select(emailId) {
            this.$router.push('/email/'+ emailId)
        },
        deleteEmail(emailId){
            this.$emit('remove', emailId)
        },
        filterByTxt(){
            this.$emit('filterByTxt', this.filterBy)
        },
    },
    created() {
        emailService.query()
             .then(email => this.email = email)
    },
    components: {
        emailPreview,
    },
}