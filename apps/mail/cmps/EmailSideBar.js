/* imports */
import { svgService } from './../services/svg.service.js'
import { eventBus } from '../../../services/event-bus.service.js'
import emailCompose from './EmailCompose.js'

export default {
    name: 'emailSideBar',
    template: `
    <section class="email-sidebar-container">
        <section>
            <header class="email-sidebar-header">
                <article class="email-sidebar-search-menu">
                    <i class="email-sidebar-search-btn" v-html="getSvgMenu('menu')" @click="showFullMenu=!showFullMenu"></i>
                    <img src="./../../../assets/img/logo.png">
                    <h1>Mail</h1>
                </article>
        </section>

        <section class="email-sidebar-compose">
            <emailCompose @addToDrafts="addToDrafts" @addEmail="addEmail(email)"/>
        </section>

        <section class="email-sidebar-sidebtn">
            <button  @click="renderInbox" v-html="getSvg('inbox')"><span class="inbox-count">0</span></button>
            <button   @click="renderStars" v-html="getSvg('starmenu')"></button>
            <button @click="renderSent" v-html="getSvg('sent')"></button>
            <button  @click="renderDrafts" v-html="getSvg('draft')"><span class="drafts-count">0</span></button>
            <button  @click="renderTrash" v-html="getSvg('delete')"> </button>
            <button @click="renderAllEmails">All</button>
        </section>
    </section>
    `,
    data(){
        return {
            unreadCounter: 0,
            showFullMenu: true,
        } 
    },
    methods: {
        renderTrash(){
            this.updateSpace('trashSpace')
            console.log('renderTrash SIDE BAR')
            this.$emit('renderTrash')
        },
        renderInbox(){
            this.updateSpace('inboxSpace')
            console.log('renderInbox SIDE BAR')
            this.$emit('renderInbox')
        },
        renderDrafts(){
            this.updateSpace('draftSpace')
            console.log('renderDrafts SIDE BAR')
            this.$emit('renderDrafts')
        },
        renderStars(){
            this.updateSpace('starSpace')
            console.log('renderStars SIDE BAR')
            eventBus.emit('renderStars')
        },
        renderSent(){
            this.updateSpace('sentSpace')
            eventBus.emit('renderSent')
        },
        renderAllEmails(){
            this.updateSpace('allSpace')
            console.log('renderAllEmails SIDE BAR')
            this.$emit('renderAllEmails')
        },
        updateSpace(space){
            this.$emit('updateSpace', space)
        },
        addToDrafts(){
            console.log('addToDrafts SIDE BAR')
            this.$emit('addToDrafts')
        },
        addEmail(email){
            console.log('addEmail SIDE BAR')
            this.$emit('addEmail', email)
        },
        getSvgMenu(iconName) {
            return svgService.getSvg(iconName)
        },
        getSvg(iconName) {
            switch(iconName) {
                case 'inbox':
                    if(this.showFullMenu) return svgService.getSvg(iconName) + 'Inbox'
                    return svgService.getSvg(iconName)
                  break;
                case 'starmenu':
                    if(this.showFullMenu) return svgService.getSvg(iconName) + 'Starred'
                    return svgService.getSvg(iconName)
                  break;
                case 'sent':
                    if(this.showFullMenu) return svgService.getSvg(iconName) + 'Sent'
                    return svgService.getSvg(iconName)
                  break;
                case 'draft':
                    if(this.showFullMenu) return svgService.getSvg(iconName) + 'Drafts'
                    return svgService.getSvg(iconName)
                  break;
                case 'delete':
                    if(this.showFullMenu) return svgService.getSvg(iconName) + 'Trash'
                    return svgService.getSvg(iconName)
                  break;
              }
        },
    },
    created() {
        setTimeout(() => {
            this.renderInbox()
          }, "1000")
    },
    components: {
        emailCompose,
    },
}

/*countUnreads() {
            this.unreadCounter = 0
            if (this.emails)
              this.emails.map((email) => {
                if (!email.isRead) this.unreadCounter++
              })
            return this.unreadCounter
        },*/