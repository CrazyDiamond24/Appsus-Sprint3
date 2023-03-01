export const utilService = {
    makeId,
    makeLorem,
    randSender,
}

function makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function makeLorem(length = 10) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']

    var sentence = ''
    while (length--) {
        sentence += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return sentence
}

function randSender() {
    const names = ['Youtube', 'Netflix', 'Facebook', 'Instagram', 'Twitter', 'Kvish 6', 'Apple', 'Almog Ohayon', 'yagel ohayun', 'Rania Elizabeth Kittan', 'Yaron Biton', 'Getin','The Open University', 'DropBox','Shein']

    return names[Math.floor(Math.random() * names.length)]

}
