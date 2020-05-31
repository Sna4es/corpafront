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
import ErrorUsername from "./components/Errors/ErrorUsername";
import ErrorPassword from "./components/Errors/ErrorPassword";
import ErrorEmail from "./components/Errors/ErrorEmail";
import ErrorAuth from "./components/Errors/ErrorAuth";
import ErrorCurrentPass from "./components/Errors/ErrorCurrentPass";
import ErrorConfPass from "./components/Errors/ErrorConfPass";
import Error400 from "./components/Errors/Error400";
import ErrorServer from "./components/Errors/ErrorServer";

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
    },
    {
      path: '/errorusername',
      name: 'errorusername',
      component: ErrorUsername,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/errorpassword',
      name: 'errorpassword',
      component: ErrorPassword,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/erroremail',
      name: 'erroremail',
      component: ErrorEmail,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/errorauth',
      name: 'errorauth',
      component: ErrorAuth,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/erroocurrentpass',
      name: 'erroocurrentpass',
      component: ErrorCurrentPass,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/errorconfpass',
      name: 'errorconfpass',
      component: ErrorConfPass,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/error400',
      name: 'error400',
      component: Error400,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/errorserver',
      name: 'errorserver',
      component: ErrorServer,
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