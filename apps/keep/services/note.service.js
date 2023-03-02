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
        type: 'NoteImg',
        isPinned: false,
        style: {
          backgroundColor: '#d7aefb', //purple
        },
        info: {
          url: 'https://usaupload.com/cache/plugins/filepreviewer/643081/bf0806adf6f3889005d1142caad14f325c97027d00a160beec3bf0bb20cc0e9a/1100x800_cropped.jpg?fbclid=IwAR1TqP5pbvOr4Y8OLnqSF7puJu6Xk8A8rsYxUBFB1ThdGg_IhM5A20gzzek',
          title: 'My Drawing',
        },
      },
      {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteImg',
        isPinned: false,
        style: {
          backgroundColor: '#a7ffeb', //purple
        },
        info: {
          url: 'https://usaupload.com/cache/plugins/filepreviewer/643082/e2b32cd2e9162740bcbea039a0ba1e40e3392ed39a77840cc69fb655708163f4/1100x800_cropped.jpg?fbclid=IwAR3cC6Gyfsq_tLlrhyyZthv9vkSeADMikl4KAEMW5Y86lMBmSOctMGbnyHc',
          title: 'Psychedelic self-portrait',
        },
      },
      {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteImg',
        isPinned: false,
        style: {
          backgroundColor: '#aecbfa',
        },
        info: {
          url: 'https://raw.githubusercontent.com/CrazyDiamond24/myDrawings/main/img/6.jpg',
          title: 'My First Realistic Drawing',
        },
      },
      {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteImg',
        isPinned: false,
        style: {
          backgroundColor: '#fdcfe8', //pink
        },
        info: {
          url: 'https://lp-cms-production.imgix.net/image_browser/Amsterdam%201.jpg',
          title: 'vacation',
        },
      },
      {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteImg',
        isPinned: false,
        style: {
          backgroundColor: '#ccff90', //purple
        },
        info: {
          url: 'https://www.gannett-cdn.com/presto/2022/09/30/PDTF/3eb55454-d73d-4d0f-b45a-a2af55e60263-Van_Gogh_SBM_013.jpg?crop=2399,1350,x0,y0&width=2399&height=1350&format=pjpg&auto=webp',
          title: 'Van Gogh',
        },
      },
      {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteImg',
        isPinned: false,
        style: {
          backgroundColor: '#e6c9a8', //beige
        },
        info: {
          url: 'https://www.vincentvangogh.org/images/paintings/irises.jpg',
          title: 'Irises - Van Gogh',
        },
      },
      {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteImg',
        isPinned: false,
        style: {
          backgroundColor: '#a7ffeb', //blue-ish
        },
        info: {
          url: 'https://cdn.prod.www.spiegel.de/images/c3d52839-0001-0004-0000-000001325849_w948_r1.778_fpx30_fpy55.jpg',
          title: 'Nights of Dam',
        },
      },
      {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: false,
        style: {
          backgroundColor: '#ccff90', //greenish
        },
        info: {
          txt: 'How I wish to go back. I miss everything about this magical city.',
        },
      },
      {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteImg',
        isPinned: false,
        style: {
          backgroundColor: '#fdcfe8', //purple
        },
        info: {
          url: 'https://raw.githubusercontent.com/CrazyDiamond24/myDrawings/main/img/4.jpg',
          title: 'July 2022',
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
          url: 'https://c8.alamy.com/comp/DT2R77/neon-lights-on-the-sign-of-the-smokey-coffeeshop-where-taking-and-DT2R77.jpg',
          title: 'Where the Magic happens',
        },
      },
      {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteVid',
        isPinned: false,
        style: {
          backgroundColor: '#e6c9a8', //beige
        },
        info: {
          url: 'https://www.youtube.com/watch?v=CGzKnyhYDQI',
          title: 'The Legend',
        },
      },
      {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteTodo',
        isPinned: false,
        style: {
          backgroundColor: '#aecbfa', //sky blue
        },
        info: {
          title: 'Shopping List',
          todos: [
            { txt: 'Avocado' },
            { txt: 'Bread' },
            { txt: 'Milk' },
            { txt: 'Tomato' },
          ],
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
      break
    case 'NoteVid':
      info.title = 'Video'
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
      backgroundColor: note.style.backgroundColor,
    },
    info: {},
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
