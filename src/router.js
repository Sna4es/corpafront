import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './components/Login.vue'
import Secure from './components/Secure.vue'
import Register from './components/Register.vue'
import Profile from "./components/Profile";
import Analyse from "./components/Analyse";
import Corpus from "./components/Corpus";
import Error from "./components/Errors/Error";
import Redactor from "./components/Redactor";


Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/secure',
      name: 'secure',
      component: Secure,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/analyse',
      name: 'analyse',
      component: Analyse,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/redactor',
      name: 'redactor',
      component: Redactor,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/corpus',
      name: 'corpus',
      component: Corpus,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/error',
      name: 'error',
      component: Error,
      meta: {
        requiresAuth: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router