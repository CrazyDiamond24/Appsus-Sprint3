/*const criteria = {
    status: 'inbox', //inbox/sent/trash/draft
    txt: 'puki', //no need to support complex text search
    isRead: true, //(optional property, if missing:showall)
    isStared: true, //(optional property, if missing:showall)
    lables:['important','romantic'] //has any of the labels
}*/

function setStatus(status) {
    criteria.status = status
}

function setTxt(txt) {
    criteria.txt = txt
}

function setRead(bool) {
    criteria.isRead = bool
}

function setStared(bool) {
    criteria.isStared = bool
}

function setLable(label) {
    criteria.lables.push(label)
}

function getStatus() {
    return criteria.status
}

function getTxt() {
    return criteria.txt
}

function getRead() {
    return criteria.isRead
}

function getStared() {
    return criteria.isStared
}

function getLable() {
    return criteria.lables
}