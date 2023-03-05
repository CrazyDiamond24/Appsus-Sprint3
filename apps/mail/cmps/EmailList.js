/* imports */
import emailPreview from './EmailPreview.js'
import emailFilter from './EmailFilter.js'

export default {
    name: 'emailList',
    props: ['emails', 'email'],
    template:`
        <section class="email-list-main">
            <emailFilter/>
        <ul>
            <li v-for="email in emails" :key="email.id" class="email-list-container" @click="select(email.id)" >
                <emailPreview :email="email" @addToStars="addToStars" @addToTrash="addToTrash" @addToArchive="addToArchive" @addToRead="addToRead"/>
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
        filterByTxt(myFilter){
            console.log('filterByTxt EmailList myFilter:' + myFilter)
            this.$emit('filterByTxt', myFilter)
        },
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
        filterByTxt(){
            this.$emit('filterByTxt', this.filterBy)
        },
    },
    components: {
        emailPreview,
        emailFilter 
    },
}