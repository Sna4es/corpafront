import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const URLP = 'http://127.0.0.1:8080/api/v1/users/me';
// const  token1 = localStorage.getItem(token)


export default new Vuex.Store({
	state: {
  		status: '',
  		token: localStorage.getItem('token') || '',
  		user : {}
	},
	mutations: {
		auth_request(state){
	    	state.status = 'loading'
	  	},
	  	auth_success(state, token, user){
		    state.status = 'success'
		    state.token = token
		    state.user = user
	  	},
	  	auth_error(state){
	    	state.status = 'error'
	  	},
	  	logout(state){
	    	state.status = ''
	    	state.token = ''
	  	},
	},
	actions: {
	  	login({commit}, user){
	        return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: 'http://192.168.1.33:8080/api/v1/auth/login', data: user, method: 'POST' })
	            .then(resp => {
	                const token = resp.data.token
	                const user = resp.data.user
	                localStorage.setItem('token', token)
	                // Add the following line:
	                axios.defaults.headers.common['Authorization'] = token
	                commit('auth_success', token, user)
	                resolve(resp)
	            })
	            .catch(err => {
	                commit('auth_error')
	                localStorage.removeItem('token')
	                reject(err)
	            })
	        })
	    },
	    register({commit}, user){
	    	return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: 'http://192.168.1.33:8080/api/v1/auth/register', data: user, method: 'POST' })
	            .then(resp => {
	                // const token = resp.data.token
	                // const user = resp.data.user
	                // localStorage.setItem('token', token)
	                // // Add the following line:
	                // axios.defaults.headers.common['Authorization'] = token
	                // commit('auth_success', token, user)
					commit('logout')
	                resolve(resp)
	            })
	            .catch(err => {
	                commit('auth_error', err)
	                localStorage.removeItem('token')
	                reject(err)
	            })
	        })
	    },
	  	logout({commit}){
		    return new Promise((resolve, reject) => {
		      	commit('logout')
		      	localStorage.removeItem('token')
		      	delete axios.defaults.headers.common['Authorization']
		      	resolve()
		    })
	  	},
        profileMe({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_success')
                // axios({ method:'GET', url: URLP, headers: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MSIsImlhdCI6MTU5MDI0MDcwMSwiZXhwIjoxNTkwMzI3MTAxfQ.CXUowuJaMoNdPUVTJoBGm587Y9N5AvIfWXy8IcfvKc5sI8tvR7YKKMSMCqESN1EbKmA1k2asbL1IawkFbHsLpQ' })
					axios.get( 'http://127.0.0.1:8080/api/v1/users/me', { crossdomain:true, headers:  {  Authorization : 'Bearer ' + localStorage.token} } )
                    .then(response => {
                        console.log(response)
                    })

            })
        },
		profileUser({commit}, user) {
			return new Promise((resolve, reject) => {
				commit('auth_success')
				axios.get('http://127.0.0.1:8080/api/v1/users/{id}', {headers: {id:"тут как=то получить id из формы", Authorization: "сюда токен"}})
					.then(response => {
						console.log(response)
					})
			})
		},
		mySettings ({commit}, user) {
	  		return new Promise((resolve, reject) => {
	  			commit('auth_success')
				axios.get('http://127.0.0.1:8080/api/v1/users/me/settings', {headers: { Authorization: "сюда токен"}} )
					.then(response => {
						console.log(response)
					})
			} )
		},
		myReplaces ({commit}, user) {
	  		return new Promise((resolve, reject) =>{
	  			commit('auth_success'),
					axios.get('http://127.0.0.1:8080/api/v1/users/me/settings/replaces', {headers: { Authorization: "сюда токен" }})
						.then(response => {
							console.log(response)
						})
			})
		},
		myReplacesSet ({commit}, user) {
	  		return new Promise((resolve, reject) => {
	  			commit('auth_success'),
					axios.put('http://127.0.0.1:8080/api/v1/users/me/settings/replaces', )
			})
		}

	},
	getters : {
	  isLoggedIn: state => !!state.token,
	  authStatus: state => state.status,
	}
})
