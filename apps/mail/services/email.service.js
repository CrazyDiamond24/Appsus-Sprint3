import { utilService } from './../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const EMAIL_STORAGE_KEY = 'emailDB'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname:'MahatmaAppsus'
}

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
}

function _createEmail(id, subject, body, to, status) {

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
        isSent: true,
    }

}

function _createEmails() {
    let emails = []
    for (var i = 0; i < 20; i++) emails.unshift(_createEmail())
    return emails
}

function saveEmail(email, append = true) {
    if (email.id) return asyncService.put(EMAIL_STORAGE_KEY, email)
    else return asyncService.post(EMAIL_STORAGE_KEY, email, append)
}

function getEmptyEmail() {
    return {
        id: utilService.makeId(),
        subject: '',
        body: '',
        isRead: false,
        sentAt: null,
        removedAt: null,
        from: utilService.randSender(),
        to: '',
        isStar: false,
        isTrash: false,
        isDraft: false,
        isSent: false,
    }
}

