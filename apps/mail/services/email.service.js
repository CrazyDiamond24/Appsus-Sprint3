import { utilService } from './../../../services/util.service.js'
import { storageService } from './../../../services/async-storage.service.js'

const EMAIL_STORAGE_KEY = 'emailDB'
const TRASH_STORAGE_KEY = 'trashDB'
const DRAFT_STORAGE_KEY = 'draftDB'
const STAR_STORAGE_KEY = 'starDB'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname:'MahatmaAppsus'
}

_createEmail()
_createTrash()
_createDrafts()
_createStars()

/*
const email = {
    id:'e101',
    subject:'Miss you!',
    body:'Would love to catch up sometimes',
    isRead:false,
    sentAt:1551133930594,
    removedAt:null,
    from:'momo@momo.com',
    to:'user@appsus.com'}
*/

export const emailService = {
    getEmptyEmail,
    saveEmail,
    query,
    remove,
    queryTrash,
    queryDrafts,
    queryStars,
    addToStars,
    addToDrafts,
}

function _createRandomEmails(id, subject, body, to, status) {

    return {
        id: utilService.makeId(),
        subject: utilService.makeLorem(2),
        body: utilService.makeLorem(14),
        isRead: false,
        sentAt: Date.now(),
        removedAt: null,
        from: utilService.randSender(),
        to: loggedinUser.email,
        isStar: false,
        isTrash: false,
        isDraft: false,
        isSent: false,
    }

}

function _createEmails() {
    let emails = []
    for (var i = 0; i < 20; i++) emails.unshift(_createEmail())
    return emails
}

/*
id: utilService.makeId(),
subject: ,
body: ,
isRead: ,
sentAt: Date.now(),
removedAt: null,
from: ,
to: loggedinUser.email,
isStar: false,
isTrash: false,
isDraft: false,
isSent: false,
*/

function _createEmail(){
    var emails = [
        {
            id: utilService.makeId(),
            subject: 'Get verified and earn $10 Trading fee rebate!',
            body: `Binance Exchange is the largest crypto exchange by trade volume and one of the fastest in the world. Beyond operating the world's leading cryptocurrency exchange, Binance also spans an entire ecosystem.

                    - Lowest transaction fees for cryptocurrency exchange
                    - High liquidity
                    - Over 600 cryptocurrencies supported
                    - Secure Asset Fund for Users (SAFU)
                    - 24/7 availability for Customer service
                    - Smooth UX/UI
                    - Diverse range of products
                    - Educational resources available`,
            isRead: false,
            sentAt: Date.now(),
            removedAt: null,
            from: 'Binance',
            to: loggedinUser.email,
            isStar: false,
            isTrash: false,
            isDraft: false,
            isSent: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Invitation to my birthday!',
            body: `Hi Almog and Rania,
                    I want to invite you to my birthday,
                    It will be in 20/03/23 in 18:00 at the forum club.
                    Please confirm your arrival !!`,
            isRead: false,
            sentAt: Date.now(),
            removedAt: null,
            from: 'moshiko4@gmail.com',
            to: loggedinUser.email,
            isStar: false,
            isTrash: false,
            isDraft: false,
            isSent: false,
        },
        {
            id: utilService.makeId(),
            subject: 'AliExpress new sales!',
            body:  `Hello,
                    You are welcome to check our new sales on website!`,
            isRead: false,
            sentAt: Date.now(),
            removedAt: null,
            from: 'sales@mail.aliexpress.com',
            to: loggedinUser.email,
            isStar: false,
            isTrash: false,
            isDraft: false,
            isSent: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Voucher for gift products',
            body: `Order now a makeup artist from our team! 💄 Professional makeup delivered to you at an affordable price + gift voucher for products! (Advertising)

            IL MAKIAGE Makeup Beauty Ltd., Haharash 8, Tel Aviv,
            
            *Subject to the regulations, does not include doubling benefits and promotions.`,
            isRead: true,
            sentAt: Date.now(),
            removedAt: null,
            from: 'noreply@ilmakiage.co.il',
            to: loggedinUser.email,
            isStar: false,
            isTrash: false,
            isDraft: false,
            isSent: false,
        },
        {
            id: utilService.makeId(),
            subject: 'You have got a new answer to the comment in the video',
            body: `You have got a new answer to the comment in the video: Ableton Live (Tutorial)`,
            isRead: true,
            sentAt: Date.now(),
            removedAt: null,
            from: 'noreply@youtube.com',
            to: loggedinUser.email,
            isStar: false,
            isTrash: false,
            isDraft: false,
            isSent: false, 
        },
        {
            id: utilService.makeId(),
            subject: 'Staff meeting today at 18:00',
            body: `Hi Rania and Almog,
                    You are welcome to the meeting today at 18:00 at the office.
                    See you there!`,
            isRead: true,
            sentAt: Date.now(),
            removedAt: null,
            from: 'ania23@gmail.com',
            to: loggedinUser.email,
            isStar: false,
            isTrash: false,
            isDraft: false,
            isSent: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Get verified and earn $10 Trading fee rebate!',
            body: `Binance Exchange is the largest crypto exchange by trade volume and one of the fastest in the world. Beyond operating the world's leading cryptocurrency exchange, Binance also spans an entire ecosystem.

                    - Lowest transaction fees for cryptocurrency exchange
                    - High liquidity
                    - Over 600 cryptocurrencies supported
                    - Secure Asset Fund for Users (SAFU)
                    - 24/7 availability for Customer service
                    - Smooth UX/UI
                    - Diverse range of products
                    - Educational resources available`,
            isRead: false,
            sentAt: Date.now(),
            removedAt: null,
            from: 'Binance',
            to: loggedinUser.email,
            isStar: false,
            isTrash: false,
            isDraft: false,
            isSent: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Invitation to my birthday!',
            body: `Hi Almog and Rania,
                    I want to invite you to my birthday,
                    It will be in 20/03/23 in 18:00 at the forum club.
                    Please confirm your arrival !!`,
            isRead: false,
            sentAt: Date.now(),
            removedAt: null,
            from: 'moshiko4@gmail.com',
            to: loggedinUser.email,
            isStar: false,
            isTrash: false,
            isDraft: false,
            isSent: false,
        },
        {
            id: utilService.makeId(),
            subject: 'AliExpress new sales!',
            body:  `Hello,
                    You are welcome to check our new sales on website!`,
            isRead: false,
            sentAt: Date.now(),
            removedAt: null,
            from: 'sales@mail.aliexpress.com',
            to: loggedinUser.email,
            isStar: false,
            isTrash: false,
            isDraft: false,
            isSent: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Voucher for gift products',
            body: `Order now a makeup artist from our team! 💄 Professional makeup delivered to you at an affordable price + gift voucher for products! (Advertising)

            IL MAKIAGE Makeup Beauty Ltd., Haharash 8, Tel Aviv,
            
            *Subject to the regulations, does not include doubling benefits and promotions.`,
            isRead: true,
            sentAt: Date.now(),
            removedAt: null,
            from: 'noreply@ilmakiage.co.il',
            to: loggedinUser.email,
            isStar: false,
            isTrash: false,
            isDraft: false,
            isSent: false,
        },
        {
            id: utilService.makeId(),
            subject: 'You have got a new answer to the comment in the video',
            body: `You have got a new answer to the comment in the video: Ableton Live (Tutorial)`,
            isRead: true,
            sentAt: Date.now(),
            removedAt: null,
            from: 'noreply@youtube.com',
            to: loggedinUser.email,
            isStar: false,
            isTrash: false,
            isDraft: false,
            isSent: false, 
        },
        {
            id: utilService.makeId(),
            subject: 'Staff meeting today at 18:00',
            body: `Hi Rania and Almog,
                    You are welcome to the meeting today at 18:00 at the office.
                    See you there!`,
            isRead: true,
            sentAt: Date.now(),
            removedAt: null,
            from: 'ania23@gmail.com',
            to: loggedinUser.email,
            isStar: false,
            isTrash: false,
            isDraft: false,
            isSent: false,
        },
        {
            id: utilService.makeId(),
            subject: 'AliExpress new sales!',
            body:  `Hello,
                    You are welcome to check our new sales on website!`,
            isRead: false,
            sentAt: Date.now(),
            removedAt: null,
            from: 'sales@mail.aliexpress.com',
            to: loggedinUser.email,
            isStar: false,
            isTrash: false,
            isDraft: false,
            isSent: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Voucher for gift products',
            body: `Order now a makeup artist from our team! 💄 Professional makeup delivered to you at an affordable price + gift voucher for products! (Advertising)

            IL MAKIAGE Makeup Beauty Ltd., Haharash 8, Tel Aviv,
            
            *Subject to the regulations, does not include doubling benefits and promotions.`,
            isRead: true,
            sentAt: Date.now(),
            removedAt: null,
            from: 'noreply@ilmakiage.co.il',
            to: loggedinUser.email,
            isStar: false,
            isTrash: false,
            isDraft: false,
            isSent: false,
        },
        {
            id: utilService.makeId(),
            subject: 'You have got a new answer to the comment in the video',
            body: `You have got a new answer to the comment in the video: Ableton Live (Tutorial)`,
            isRead: true,
            sentAt: Date.now(),
            removedAt: null,
            from: 'noreply@youtube.com',
            to: loggedinUser.email,
            isStar: false,
            isTrash: false,
            isDraft: false,
            isSent: false, 
        },
        {
            id: utilService.makeId(),
            subject: 'Staff meeting today at 18:00',
            body: `Hi Rania and Almog,
                    You are welcome to the meeting today at 18:00 at the office.
                    See you there!`,
            isRead: true,
            sentAt: Date.now(),
            removedAt: null,
            from: 'ania23@gmail.com',
            to: loggedinUser.email,
            isStar: false,
            isTrash: false,
            isDraft: false,
            isSent: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Get verified and earn $10 Trading fee rebate!',
            body: `Binance Exchange is the largest crypto exchange by trade volume and one of the fastest in the world. Beyond operating the world's leading cryptocurrency exchange, Binance also spans an entire ecosystem.

                    - Lowest transaction fees for cryptocurrency exchange
                    - High liquidity
                    - Over 600 cryptocurrencies supported
                    - Secure Asset Fund for Users (SAFU)
                    - 24/7 availability for Customer service
                    - Smooth UX/UI
                    - Diverse range of products
                    - Educational resources available`,
            isRead: false,
            sentAt: Date.now(),
            removedAt: null,
            from: 'Binance',
            to: loggedinUser.email,
            isStar: false,
            isTrash: false,
            isDraft: false,
            isSent: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Invitation to my birthday!',
            body: `Hi Almog and Rania,
                    I want to invite you to my birthday,
                    It will be in 20/03/23 in 18:00 at the forum club.
                    Please confirm your arrival !!`,
            isRead: false,
            sentAt: Date.now(),
            removedAt: null,
            from: 'moshiko4@gmail.com',
            to: loggedinUser.email,
            isStar: false,
            isTrash: false,
            isDraft: false,
            isSent: false,
        },
        {
            id: utilService.makeId(),
            subject: 'AliExpress new sales!',
            body:  `Hello,
                    You are welcome to check our new sales on website!`,
            isRead: false,
            sentAt: Date.now(),
            removedAt: null,
            from: 'sales@mail.aliexpress.com',
            to: loggedinUser.email,
            isStar: false,
            isTrash: false,
            isDraft: false,
            isSent: false,
        },
        {
            id: utilService.makeId(),
            subject: 'Voucher for gift products',
            body: `Order now a makeup artist from our team! 💄 Professional makeup delivered to you at an affordable price + gift voucher for products! (Advertising)

            IL MAKIAGE Makeup Beauty Ltd., Haharash 8, Tel Aviv,
            
            *Subject to the regulations, does not include doubling benefits and promotions.`,
            isRead: true,
            sentAt: Date.now(),
            removedAt: null,
            from: 'noreply@ilmakiage.co.il',
            to: loggedinUser.email,
            isStar: false,
            isTrash: false,
            isDraft: false,
            isSent: false,
        },
        {
            id: utilService.makeId(),
            subject: 'You have got a new answer to the comment in the video',
            body: `You have got a new answer to the comment in the video: Ableton Live (Tutorial)`,
            isRead: true,
            sentAt: Date.now(),
            removedAt: null,
            from: 'noreply@youtube.com',
            to: loggedinUser.email,
            isStar: false,
            isTrash: false,
            isDraft: false,
            isSent: false, 
        },
        {
            id: utilService.makeId(),
            subject: 'Staff meeting today at 18:00',
            body: `Hi Rania and Almog,
                    You are welcome to the meeting today at 18:00 at the office.
                    See you there!`,
            isRead: true,
            sentAt: Date.now(),
            removedAt: null,
            from: 'ania23@gmail.com',
            to: loggedinUser.email,
            isStar: false,
            isTrash: false,
            isDraft: false,
            isSent: false,
        },
    ]
    utilService.saveToStorage(EMAIL_STORAGE_KEY, emails)
}



function saveEmail(email, append = true) {
    if (email.id) return storageService.put(EMAIL_STORAGE_KEY, email)
    else return storageService.post(EMAIL_STORAGE_KEY, email, append)
}

function getEmptyEmail() {
    return {
        id: utilService.makeId(),
        subject: '(no subject)',
        body: '',
        isRead: true,
        sentAt: null,
        removedAt: null,
        from: loggedinUser.email,
        to: '',
        isStar: false,
        isTrash: false,
        isDraft: false,
        isSent: false,
    }
}

function get(id) {
    return storageService.get(EMAIL_STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(EMAIL_STORAGE_KEY, id)
}

function query() {
    return storageService.query(EMAIL_STORAGE_KEY).then((emails) => { return emails })
}

function _createTrash(){
        var trashEmails = [
        {
            id: utilService.makeId(),
            subject: utilService.makeLorem(2),
            body: utilService.makeLorem(14),
            isRead: false,
            sentAt: Date.now(),
            removedAt: null,
            from: utilService.randSender(),
            to: loggedinUser.email,
            isStar: false,
            isTrash: false,
            isDraft: false,
            isSent: false,
        },
        {
            id: utilService.makeId(),
            subject: utilService.makeLorem(2),
            body: utilService.makeLorem(14),
            isRead: false,
            sentAt: Date.now(),
            removedAt: null,
            from: utilService.randSender(),
            to: loggedinUser.email,
            isStar: false,
            isTrash: false,
            isDraft: false,
            isSent: false,
        },
        {
            id: utilService.makeId(),
            subject: utilService.makeLorem(2),
            body: utilService.makeLorem(14),
            isRead: false,
            sentAt: Date.now(),
            removedAt: null,
            from: utilService.randSender(),
            to: loggedinUser.email,
            isStar: false,
            isTrash: false,
            isDraft: false,
            isSent: false,
        },
    ]
    utilService.saveToStorage(TRASH_STORAGE_KEY, trashEmails)
}

function queryTrash() {
    return storageService.query(TRASH_STORAGE_KEY)
        .then(tEmails => { return tEmails })
}

function _createDrafts(){
    var draftEmails = [
    {
        id: utilService.makeId(),
        subject: utilService.makeLorem(2),
        body: utilService.makeLorem(14),
        isRead: false,
        sentAt: Date.now(),
        removedAt: null,
        from: utilService.randSender(),
        to: loggedinUser.email,
        isStar: false,
        isTrash: false,
        isDraft: false,
        isSent: false,
    },
    {
        id: utilService.makeId(),
        subject: utilService.makeLorem(2),
        body: utilService.makeLorem(14),
        isRead: false,
        sentAt: Date.now(),
        removedAt: null,
        from: utilService.randSender(),
        to: loggedinUser.email,
        isStar: false,
        isTrash: false,
        isDraft: false,
        isSent: false,
    },
    {
        id: utilService.makeId(),
        subject: utilService.makeLorem(2),
        body: utilService.makeLorem(14),
        isRead: false,
        sentAt: Date.now(),
        removedAt: null,
        from: utilService.randSender(),
        to: loggedinUser.email,
        isStar: false,
        isTrash: false,
        isDraft: false,
        isSent: false,
    },
]
utilService.saveToStorage(DRAFT_STORAGE_KEY, draftEmails)
}

function queryDrafts() {
return storageService.query(DRAFT_STORAGE_KEY)
    .then(dEmails => { return dEmails })
}

function addToDrafts(email){
    console.log('email.service: addToStars')
    storageService.post(DRAFT_STORAGE_KEY, email)
}

function _createStars(){
    var starEmails = [
    {
        id: utilService.makeId(),
        subject: utilService.makeLorem(2),
        body: utilService.makeLorem(14),
        isRead: false,
        sentAt: Date.now(),
        removedAt: null,
        from: utilService.randSender(),
        to: loggedinUser.email,
        isStar: false,
        isTrash: false,
        isDraft: false,
        isSent: false,
    },
    {
        id: utilService.makeId(),
        subject: utilService.makeLorem(2),
        body: utilService.makeLorem(14),
        isRead: false,
        sentAt: Date.now(),
        removedAt: null,
        from: utilService.randSender(),
        to: loggedinUser.email,
        isStar: false,
        isTrash: false,
        isDraft: false,
        isSent: false,
    },
    {
        id: utilService.makeId(),
        subject: utilService.makeLorem(2),
        body: utilService.makeLorem(14),
        isRead: false,
        sentAt: Date.now(),
        removedAt: null,
        from: utilService.randSender(),
        to: loggedinUser.email,
        isStar: false,
        isTrash: false,
        isDraft: false,
        isSent: false,
    },
    ]
    utilService.saveToStorage(STAR_STORAGE_KEY, starEmails)
}

function queryStars() {
return storageService.query(STAR_STORAGE_KEY)
    .then(sEmails => { return sEmails })
}

function addToStars(email){
    console.log('email.service: addToStars')
    storageService.post(STAR_STORAGE_KEY, email)
}

