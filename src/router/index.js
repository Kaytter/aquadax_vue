import Vue from 'vue'
import Router from 'vue-router'

//apps
import Dashboard from '../views/apps/Dashboard.vue'
import Calendar from '../views/apps/Calendar.vue'
import Contacts from '../views/apps/Contacts.vue'
import Gallery from '../views/apps/Gallery.vue'
import Timeline from '../views/apps/Timeline.vue'

//pages
import Login from '../views/pages/authentication/Login.vue'
import Register from '../views/pages/authentication/Register.vue'
import ForgotPassword from '../views/pages/authentication/ForgotPassword.vue'
import Profile from '../views/pages/Profile.vue'
import NotFound from '../views/pages/NotFound.vue'
import Invoice from '../views/pages/Invoice.vue'
import layouts from '../layout'
import store from '../store'

//Aquadax Routes
import Stocks_index from '../components/stock/stock_index.vue'
import Stocks_add from '../components/stock/stock_add.vue'
import Stocks_edit from '../components/stock/stock_edit.vue'

Vue.use(Router)


const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			alias: '/dashboard',
			name: 'dashboard',
			component: Dashboard,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['app']
			}
		},

		//Stock routes Start
		{
			path: '/stocks',
			name: 'stocks_index',
			component: Stocks_index,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['Stocks']
			}
		},
		{
			path: '/stocks/add',
			name: 'stocks_add',
			component: Stocks_add,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['Stocks']
			}
		},
		{
			path: '/stocks/edit/:id',
			name: 'stocks_add',
			component: Stocks_edit,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['Stocks']
			}
		},

		//Stock routes END


		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/register',
			name: 'register',
			component: Register,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/forgot-password',
			name: 'forgot-password',
			component: ForgotPassword,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{ 
			path: '/logout',
			beforeEnter (to, from, next) {
				auth.logout()
				next({path:'/login'})
			}
		},
		{
			path: '*',
			name: 'not-found',
			component: NotFound,
			meta: {
				layout: layouts.contenOnly
			}
		}
	]
})


const l = {
	contenOnly(){
		store.commit('setLayout', layouts.contenOnly)
	},
	navLeft(){
		store.commit('setLayout', layouts.navLeft)
	},
	navRight(){
		store.commit('setLayout', layouts.navRight)
	},
	navTop(){
		store.commit('setLayout', layouts.navTop)
	},
	navBottom(){
		store.commit('setLayout', layouts.navBottom)
	},
	set(layout){
		store.commit('setLayout', layout)
	}
}

//insert here login logic
const auth = {
	loggedIn() {
		return store.getters.isLogged
	},
	logout() {
		store.commit('setLogout')
	}
}

router.beforeEach((to, from, next) => {
	let authrequired = false
	if(to && to.meta && to.meta.auth)
		authrequired = true

	//console.log('authrequired', authrequired, to.name)

	if(authrequired) {
		if(auth.loggedIn()) {
			if(to.name === 'login') {
				window.location.href = '/'
				return false
			} else { 
				next()
			}
		} else {
			if(to.name !== 'login'){
				window.location.href = '/login'
				return false
			}
			next()
		}
	} else {
		if(auth.loggedIn() && to.name === 'login'){
			window.location.href = '/'
			return false
		} else {
			next()
		}
	}

	if(to && to.meta && to.meta.layout){
		l.set(to.meta.layout)
	}	
})

router.afterEach((to, from) => {
	setTimeout(()=>{
		store.commit('setSplashScreen', false)
	}, 500)
})

export default router