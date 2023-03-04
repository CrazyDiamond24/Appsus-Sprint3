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
    props: ['emails', 'email'],
    template:`
        <section class="email-list-main">
        <ul>
            <li v-for="email in emails" :key="email.id" class="email-list-container" @click="select(email.id)" >
                <emailPreview :email="email" @remove="deleteEmail" @addToStars="addToStars" @addToTrash="addToTrash" @addToArchive="addToArchive" @addToRead="addToRead" @renderDetails="renderDetails(id)"/>
            </li>
        </ul>
        </section>
    `,
    data(){
        return{
            filterBy: '', /*********TODO: לטפל בחיפוש */
            /*email: null,  */
        }
    },
    methods: {
        updateIn(){
            this.$emit('updateIn')
        },
        addToStars(){
            this.$emit('addToStars')
        },
        addToRead(id){
            this.$emit('addToRead', id)
        },
        renderDetails(id){
            console.log('renderDetails list')
            this.$emit('renderDetails', id)
        },
        addToTrash(email){
            console.log('addToTrash LIST')
            this.$emit(`addToTrash`, email)
        },
        addToArchive(){
            console.log('addToArchive LIST')
            this.$emit('addToArchive')
        },
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
    components: {
        emailPreview,
    },
}