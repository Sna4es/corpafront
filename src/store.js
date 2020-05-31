import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import store from "@vue/cli-service/generator/vuex/template/src/store";
import Profile from "./components/Profile";
import Vue2Storage$1 from "vue2-storage";
import router from "./router";

Vue.use(Vuex)
Vue.use(Vue2Storage)

// axios.defaults.headers.post['Content-type'] = 'application/json'

export default new Vuex.Store({
    state2: {
        userId: '',
    },
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {},
        dat: {},
        username: {},
        userId: {},
        email: {},
        roles: {},
        userSettings: {

        },
        replaces: {},
        NewUsername: {},
        origPassword: {},
        nPassword: {},
        nPasswordConfirm: {},
        mySettingsd: {},
        originalText: {},

    },
    mutations: {

        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, username, userId) {
            state.status = 'success'
            state.token = token
            state.username = this.username
            state.userId = userId
        },
        auth_work(state, token, username, userId) {
            state.status = 'authorized'
            state.token = token
            state.username = username
            state.userId = userId

        },
        auth_error(state) {
            state.status = 'error'
        },
        work_error(state) {
            state.status = 'error'
            state.token = token
            state.username = username
            state.userId = userId

        },
        logout(state) {
            state.status = ''
            state.token = ''
        },
    },
    actions: {
        login: function ({commit}, dat) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: 'http://192.168.1.33:8080/api/v1/auth/login', data: dat, method: 'POST'})
                    .then(response => {
                        const token = response.data.token
                        const username = response.data.username
                        const userId = response.data.userId
                        localStorage.setItem('token', token)
                        // Add the following line:
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_work', token, username, userId)
                        console.log(response)
                        // console.log(user, " -user" )
                        resolve(response)
                    }, )
                    .catch(error => {
                        if (!error.response) {
                            console.log('сервер лежит')
                            router.push('/errorserver')
                        }
                        if (error.response.status === 401) {
                            console.log('invalid user or pass')

                        }
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(error)
                       console.log(error.response.data.message)
                        console.log(error.response)

                    })
            })
        },
        register({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: 'http://192.168.1.33:8080/api/v1/auth/register', data: user, method: 'POST'})
                    .then(response => {
                        // const token = resp.data.token
                        // const user = resp.data.user
                        // localStorage.setItem('token', token)
                        // // Add the following line:
                        // axios.defaults.headers.common['Authorization'] = token
                        // commit('auth_success', token, user)
                        commit('logout')
                        resolve(response)
                    })
                    .catch(error => {
                        if (!error.response) {
                            console.log('сервер лежит')
                            router.push('/errorserver')
                        }
                        // commit('auth_error', error)
                        // localStorage.removeItem('token')
                        if (error.response.data.message === "Error: Username is already taken!") {
                            console.log('error username')
                            router.push('/errorusername')
                            commit('logout')
                        } if (error.response.data.message === "Error: Email is already in use!") {
                            console.log('error EMAIL')
                            router.push('/erroremail')
                            commit('logout')
                        }
                        reject(error)
                       console.log(error.response.data)
                    })
            })
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        },
        myProfile({commit} ) {   ///просмотр инфы о себе
            return new Promise((resolve, reject) => {
                const token = localStorage.token
                commit('auth_success', token)
                // commit('auth_success')
                axios.get('http://127.0.0.1:8080/api/v1/users/me', {
                    headers: {Authorization: 'Bearer ' + localStorage.token}
                })
                    .then(response => {
                        const userId = response.data.id
                        const username = response.data.username
                        const email = response.data.email
                        const roles = response.data.roles
                        const userSettings = response.data.userSettings
                        const replaces = response.data.userSettings.replaces
                        const up = response.data
                        const  parsed = JSON.stringify(up)
                        sessionStorage.setItem('up', parsed)
                        // sessionStorage.setItem('uname', username)
                        // console.log(response)
                        // console.log(response.data.id+'cl1')
                        console.log(sessionStorage.up + '  store')
                        // console.log(" 2 ", username," 3 ", email," 4 ", roles)
                        // commit('auth_work', token)
                        // commit('auth_success',   username)
                    })
                    .catch(error => {
                        if (!error.response) {
                            console.log('сервер лежит')
                            router.push('/errorserver')
                        }
                        if (error.response.status === 401) {
                            commit('logout')
                            localStorage.removeItem('token')
                        }
                        console.log('errorstore='+ error)
                        reject(error)
                    })

            })
        },
        profileUser({commit}, user) {   ///просмотр инфы о пользователе
            return new Promise((resolve, reject) => {
                axios.get('http://127.0.0.1:8080/api/v1/users/{id}', {
                    headers: {
                        id: "тут как=то получить id из формы",
                        Authorization: "сюда токен"
                    }
                })
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => {
                        if (!error.response) {
                            console.log('сервер лежит')
                            router.push('/errorserver')
                        }
                    })
            })
        },
        mySettings({commit}, user, mySettingsd) {  // посмотреть свои настройки
            return new Promise((resolve, reject) => {
                const token = localStorage.token
                commit('auth_work', token)
                // commit('auth_success')
                axios.get('http://127.0.0.1:8080/api/v1/users/me/settings', {headers: {Authorization: "Bearer " + localStorage.token}})
                    .then(response => {
                        if (response.status ===200 ) {
                            console.log('200 store ')
                        }
                        mySettingsd = response.data
                        console.log(response)
                         console.log(mySettingsd)
                       const parsed = JSON.stringify(mySettingsd)
                        localStorage.setItem('mysett', parsed)
                        // commit('auth_success')
                        resolve(response)
                    })
                    .catch(error => {
                        if (!error.response) {
                            console.log('сервер лежит')
                            router.push('/errorserver')
                        }
                        if (error.response.status === 401) {
                            commit('logout')
                            localStorage.removeItem('token')
                        }
                        console.log('errorstore='+ error)
                        reject(error)
                    })
            })
        },
        myReplaces({commit}, user) {    //посмотреть свои замены
            return new Promise((resolve, reject) => {
                const token = localStorage.token
                commit('auth_work', token)
                // commit('auth_success'),
                    axios.get('http://127.0.0.1:8080/api/v1/users/me/settings/replaces', {headers: {Authorization:  "Bearer " + localStorage.token, }})
                        .then(response => {
                            const repl = response.data
                            const parsed = JSON.stringify(repl)
                            localStorage.setItem('repla', parsed)
                            console.log(parsed)
                            // this.$storage.set('replacez',{parsed},{ttl:10*1000})
                            // console.log(response.data)
                        })
                        .catch(error => {
                            if (!error.response) {
                                console.log('сервер лежит')
                                router.push('/errorserver')
                            }
                            if (error.response.status === 401 ) {
                                commit('logout')
                                localStorage.removeItem('token')
                            }
                            reject(error)
                            console.log(error.response.status)
                            // commit('auth_success')
                            // if (error.response.status === 401) {
                            //     commit ('logout')
                            //     localStorage.removeItem('token')
                            // }
                        })
            })
        },
        myNewUsername({commit}, user) {   // ПЕРЕИМЕНОВАТЬ ПОЛЬЗОВАТЕЛЯ
            return new Promise((resolve, reject) => {
                const token = localStorage.token
                commit('auth_work', token)
                const config = {
                    headers: { Authorization: 'Bearer ' + localStorage.token }};
                const username = 'alex'
                const kav = '"';
                    // axios.put('http://127.0.0.1:8080/api/v1/users/me/username', { headers: {Authorization: 'Bearer '+ localStorage.token}, username})
                // axios.put('http://127.0.0.1:8080/api/v1/users/me/username', {username}, config)
                    axios({url:'http://127.0.0.1:8080/api/v1/users/me/username', data:user,  method:"POST"}, config )
                        .then( localStorage.removeItem('token'),
                            response => {
                            // localStorage.removeItem('token')
                            delete  axios.defaults.headers.common('Authorization')
                            // commit('logout')
                            // console.log(response)
                            // console.log(user+'  user')
                            resolve(response)
                        }, console.log(user))
                        .catch(error => {
                            if (!error.response) {
                                console.log('сервер лежит')
                                router.push('/errorserver')
                            }
                            if (error.response.status === 400) {
                                console.log('error 400')
                                router.push('/error400')
                            }
                            // commit('work_error')
                            reject(error)
                            // console.log(error)
                            // console.log(error.response.data)
                        })
            })
        },
        myNewPassword({commit}, username, token, NewPassword, origPassword, nPassword, nPasswordConfirm ) {  // СМЕНИТЬ ПАРОЛЬ
            return new Promise((resolve, reject) => {
                const config = {
                    headers: { Authorization: 'Bearer ' + localStorage.token }};
                const kav= '"';
                    //axios.put('http://127.0.0.1:8080/api/v1/users/me/password', { headers: {Authorization: 'Bearer
                // ' + localStorage.token}, myNewPassword })
                axios.post('http://127.0.0.1:8080/api/v1/users/me/password', {currentPassword: origPassword, newPassword: nPassword, newPasswordConfirm: kav+nPasswordConfirm+kav}, config)
                        .then(response => {
                            resolve(response)
                            console.log(response)
                        })
                        .catch(error => {
                            if (!error.response) {
                                console.log('сервер лежит')
                                router.push('/errorserver')
                            }
                            if (error.response.message === "Check the current password") {
                                console.log('error current pass')
                                router.push('/errorcurrentpass')
                            }
                            if (error.response.message === 'New password mismatch') {
                                console.log('error pass confirm')
                                router.push('/errorconfpass')
                            }
                            console.log(error)
                            reject(error)
                            // commit('auth_success')
                        })
            })
        },
        myReplacesSet({commit}, username, token, replaces) {  //задать свои замены
            return new Promise((resolve, reject) => {
                const config = {
                    headers: { Authorization: 'Bearer ' + localStorage.token }};
                const rep = '{"g":"j"}';
                    console.log(replaces)
                    axios.put('http://127.0.0.1:8080/api/v1/users/me/settings/replaces', {replaces: rep },  config )
                        .then(response => {
                            resolve(response)
                            console.log(response)
                        })
                        .catch(error =>{
                            if (!error.response) {
                                console.log('сервер лежит')
                                router.push('/errorserver')
                            }
                            if (error.response.status === 415) {
                                console.log('error 415')
                                router.push('/error400')
                            }
                            reject(error)
                            console.log(error.response.data)
                            console.log(localStorage.token)
                        })
            })
        },
        // analyseText({commit}, username, token, originalText) {
        //     return new Promise((resolve, reject) => {
        //         commit("auth_success"),
        //             axios.post('http://127.0.0.1:8080/analyse', {originalText}, {headers: { Authorization: "Bearer " + localStorage.token}})
        //                 axios({method: 'GET', url: 'http://127.0.0.1:8080/analyse', })
        //                 .catch(error => {
        //                     reject(error)
        //                     console.log(error)
        //                 })
        //
        //     })
        // }
        analyseText({commit}, user, username, token, originalText) {
            return new Promise((resolve, reject) => {
                const config = {
                    headers: { Authorization: 'Bearer ' + localStorage.token }                };
                const kav= '"';
                const atext = {text: "лук   стоит дом волга"}
                const rep = 'false '
                    // axios.post('http://127.0.0.1:8080/analyse', { text: atext }, config)
                        axios({
                            url: 'http://127.0.0.1:8080/analyse',
                            data: user,
                            method: 'POST',
                            headers: { Authorization: 'Bearer ' + localStorage.token }
                        })
                        .then(response => {
                            const analysedText = response.data
                            console.log(response.data)
                            //console.log(analysedText)
                            const parsed = JSON.stringify(analysedText);
                            localStorage.setItem('antext', parsed)
                            // commit('auth_success')
                        })
                        .catch(error => {
                            if (!error.response) {
                                console.log('сервер лежит')
                                router.push('/errorserver')
                            }
                            if (error.response.status === 500) {
                                console.log('error json')
                            }
                            reject(error)
                            console.log(error.response.data)
                        })
            })
        }

    },


    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        getText: state => state.originalText,
        getUserid: state => state.username,
    }
})
