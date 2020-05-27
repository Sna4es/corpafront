import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// axios.defaults.headers.post['Content-type'] = 'application/json'

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {},
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
            state.username = username
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
        login: function ({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: 'http://192.168.1.33:8080/api/v1/auth/login', data: user, method: 'POST'})
                    .then(response => {
                        const token = response.data.token
                        const username = response.data.username
                        const userId = response.data.userId
                        localStorage.setItem('token', token)
                        // Add the following line:
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token, username, userId)
                        resolve(response)
                        console.log(token)
                        console.log(token, "     ", username, "    ", userId, '  ' )
                    }, )
                    .catch(error => {
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
                        // commit('auth_error', error)
                        // localStorage.removeItem('token')
                        if (error.response.data.message === "Error: Username is already taken!") {
                            console.log('error username')
                            commit('logout')
                        } if (error.response.data.message === "Error: Email is already in use!") {
                            console.log('error EMAIL')
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
                        // console.log(response)
                        console.log(response.data.id)
                        // console.log(" 2 ", username," 3 ", email," 4 ", roles)
                        // commit('auth_work', token)
                    })
                    .catch(error => {
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
            })
        },
        mySettings({commit}, user, mySettingsd) {  // посмотреть свои настройки
            return new Promise((resolve, reject) => {
                const token = localStorage.token
                commit('auth_work', token)
                // commit('auth_success')
                axios.get('http://127.0.0.1:8080/api/v1/users/me/settings', {headers: {Authorization: "Bearer " + localStorage.token}})
                    .then(response => {
                        mySettingsd = response.data
                        console.log(response)
                        console.log(mySettingsd)
                        console.log(localStorage.token)

                        // commit('auth_success')
                        resolve(response)
                    })
                    .catch(error => {
                         reject(error)
                        console.log(error)
                    })
            })
        },
        myReplaces({commit}, user) {    //посмотреть свои замены
            return new Promise((resolve, reject) => {
                const token = localStorage.token
                commit('auth_work', token)
                // commit('auth_success'),
                    axios.get('http://127.0.0.1:8080/api/v1/users/me/settings/replaces', {headers: {Authorization:  "Bearer1 " + localStorage.token, }})
                        .then(response => {
                            const repl = response.data
                            console.log(response.data)
                        })
                        .catch(error => {
                            reject(error)
                            console.log(error.response.status)
                            // commit('auth_success')
                            if (error.response.status === 401) {
                                commit ('auth_success')
                            }
                        })
            })
        },
        myNewUsername({commit}, user, username, NewUsername) {   // ПЕРЕИМЕНОВАТЬ ПОЛЬЗОВАТЕЛЯ
            return new Promise((resolve, reject) => {
                const config = {
                    headers: { Authorization: 'Bearer ' + localStorage.token }};
                const username = 'alex'
                const kav = '"';
                    // axios.put('http://127.0.0.1:8080/api/v1/users/me/username', { headers: {Authorization: 'Bearer '+ localStorage.token}, username})
                axios.put('http://127.0.0.1:8080/api/v1/users/me/username', {user}, config)
                        .then( localStorage.removeItem('token'),
                            response => {
                            localStorage.removeItem('token')
                            delete  axios.defaults.headers.common('Authorization')
                            commit('logout')
                            resolve(response)
                            console.log(response)
                            console.log(response.data)

                        }, console.log(user))
                        .catch(error => {
                            commit('work_error')
                            reject(error)
                            console.log(error)
                            console.log(error.response.data)
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
                    headers: { Authorization: 'Bearer ' + localStorage.token }, params: {doReplaces: "true"}
                };
                const kav= '"';
                const atext = 'лук';
                const rep = 'false '
                    axios.post('http://127.0.0.1:8080/analyse', {text: atext, doReplaces: rep }, config)
                        .then(response => {
                            const analysedText = response.data
                            console.log(response.data)
                            console.log(analysedText)
                            commit('auth_success')
                        })
                        .catch(error => {
                            reject(error)
                            console.log(error.response.data)
                            console.log(username)
                        })
            })
        }

    },


    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        getText: state => state.originalText,
    }
})
