import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import NoteIndex from './apps/keep/pages/NoteIndex.js'
import NoteDetails from './apps/keep/pages/NoteDetails.js'
import EmailIndex from './apps/mail/pages/EmailIndex.js'
import EmailList from './apps/mail/cmps/EmailList.js'
import EmailDetails from './apps/mail/pages/EmailDetails.js'

import BookIndex from './apps/book/pages/BookIndex.js'
import BookDetails from './apps/book/pages/BookDetails.js'
import BookEdit from './apps/book/pages/BookEdit.js'
import AddBook from './apps/book/cmps/AddBook.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/about',
      component: AboutUs,
    },
    {
      path: '/notes',
      component: NoteIndex,
      children: [
        {
          path: ':id',
          name: 'NoteDetails',
          component: NoteDetails,
          props: true,
        },
      ],
    },
    {
      path: '/email',
      component: EmailIndex,
      children: [
        {
          path: 'list',
          component: EmailList,
        },
        {
          path: ':id',
          component: EmailDetails,
        },
      ],
    },
    {
      path: '/book',
      component: BookIndex,
    },
    {
      path: '/book/:bookId',
      component: BookDetails,
    },
    {
      path: '/book/edit/:bookId?',
      component: BookEdit,
    },
    {
      path: '/book/add',
      component: AddBook,
    },
  ],
}

export const router = createRouter(routerOptions)
