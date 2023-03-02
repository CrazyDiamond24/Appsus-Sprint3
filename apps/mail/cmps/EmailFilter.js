/*export default {
    template: `
        <section>
            <h2>Filter</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis enim rem porro delectus. Quos expedita ipsam repellendus voluptas quas, nam ea eligendi veniam ullam, modi impedit eveniet quia quaerat molestias?</p>
        </section>
    `,
}*/

export default {
    name: 'emailFilter',
    template: `
    <section>
    <button>Inbox <span class="inbox-count">0</span></button>
    <button>Starred</button>
    <button>Sent</button>
    <button>Drafts<span class="drafts-count">0</span></button>
    <button>Trash</button>
    <button>All</button>
    </section>
    `,
}