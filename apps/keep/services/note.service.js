import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from './../../../services/util.service.js'

const KEEP_KEY = 'notesDB'

export const keepService = {
    query,
    remove,
}

_createNotes()



function query() {
  return storageService.query(KEEP_KEY).then((notes) => {
    if (!notes.length) {
      const defNotes = createNotes
      storageService.post(KEEP_KEY, defNotes)
      return defNotes
    }
    return notes
  })
}

function remove(noteId) {
  return storageService.remove(KEEP_KEY, noteId)
}

function _createNotes() {
  let notes = utilService.loadFromStorage(KEEP_KEY)
  if (!notes || !notes.length) {
    notes = [
      {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: false,
        style: {
          backgroundColor: '#f5ee9e',
        },
        info: {
          txt: 'Anxiety attacks are real!',
        },
      },
      {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteImg',
        isPinned: false,
        style: {
          backgroundColor: '#f5ee9e',
        },
        info: {
          url: 'https://lp-cms-production.imgix.net/image_browser/Amsterdam%201.jpg',
          title: 'vacation',
        },
      },
    ]

    utilService.saveToStorage(KEEP_KEY, notes)
  }
  return notes
}
// function addNote(note) {
//     const newNote = _CreateNote(note.type, note.info);
//     return storageService.post(KEEP_KEY, newNote)
//         .then(note => note);
// }

