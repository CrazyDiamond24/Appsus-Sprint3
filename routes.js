import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import NoteIndex from './apps/keep/pages/NoteIndex.js'
import EmailIndex from './apps/mail/pages/EmailIndex.js'
import EmailList from './apps/mail/cmps/EmailList.js'
import EmailDetails from './apps/mail/pages/EmailDetails.js'

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
		},
		{
			path: '/email/',
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
			]
		},
	],
}

export const router = createRouter(routerOptions)
