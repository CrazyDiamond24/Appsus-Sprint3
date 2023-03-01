import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from './../../../services/util.service.js'

const KEEP_KEY = 'notesDB'

export const keepService = {
  query,
  remove,
  update,
  addNote,
  copyNote,
  postNote,
  
}

_createNotes()

function query() {
  return storageService.query(KEEP_KEY).then((notes) => {
    if (!notes.length) {
      const defNotes = _createNotes
      storageService.post(KEEP_KEY, defNotes)
      return defNotes
    }
    return notes
  })
}

function remove(noteId) {
  return storageService.remove(KEEP_KEY, noteId)
}

function update(note) {
  return storageService.put(KEEP_KEY, note)
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

//expects note type/info as separate parameters
function addNote(note) {
  const newNote = _createNote(note.type, note.info)
  return storageService.post(KEEP_KEY, newNote).then((note) => note)
}

//allows to pass in a complete note object
function postNote(note) {
  return storageService.post(KEEP_KEY, note).then((note) => note)
}

function _createNote(type, setting) {
  const info = {}
  switch (type) {
    case 'NoteTxt':
      info.txt = setting.value
      break
    case 'NoteImg':
      info.title = 'Image'
      info.url = setting.value
  }
  const style = { backgroundColor: '#f5ee9e' }
  const newNote = {
    type,
    isPinned: false,
    info,
    style,
  }
  return newNote
}


//all properties except for ID
function copyNote(note) {
  const newNote = {
    id: utilService.makeId(),
    createdAt: Date.now(),
    type: note.type,
    isPinned: note.isPinned,
    style: {
      backgroundColor: note.style.backgroundColor
    },
    info: {}
  }
  
  switch (note.type) {
    case 'NoteTxt':
      newNote.info.txt = note.info.txt
      break
    case 'NoteImg':
      newNote.info.title = note.info.title
      newNote.info.url = note.info.url
      break
  }
  
  return newNote
}



