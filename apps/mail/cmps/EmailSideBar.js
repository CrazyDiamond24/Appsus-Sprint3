export default {
    name: 'emailFilter',
    template: `
    <section>
    <button @click="renderInbox">Inbox <span class="inbox-count">0</span></button>
    <button @click="renderStars">Starred</button>
    <button>Sent</button>
    <button @click="renderDrafts">Drafts<span class="drafts-count">0</span></button>
    <button @click="renderTrash">Trash</button>
    <button>All</button>
    </section>
    `,
    methods: {
        renderTrash(){
            this.$emit('renderTrash')
        },
        renderInbox(){
            this.$emit('renderInbox')
        },
        renderDrafts(){
            this.$emit('renderDrafts')
        },
        renderStars(){
            this.$emit('renderStars')
        },
    }
}