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
        NewPassword: {},
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
        auth_work(state, token, username, userID) {
            state.status = 'authorized'
            state.token = token
            state.username = username
            state.userId = userID
        },
        auth_error(state) {
            state.status = 'error'
        },
        work_error(state) {
            state.status = 'error'
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
                        console.log(response)
                        console.log(token, "     ", username, "    ", userId)
                    })
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
                        commit('auth_error', error)
                        localStorage.removeItem('token')
                        reject(error)
                       console.log(error.response.data.message)
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
        profileMe({commit}, user) {   ///просмотр инфы о себе
            return new Promise((resolve, reject) => {
                commit('auth_success')
                // axios({ method:'GET', url: URLP, headers: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MSIsImlhdCI6MTU5MDI0MDcwMSwiZXhwIjoxNTkwMzI3MTAxfQ.CXUowuJaMoNdPUVTJoBGm587Y9N5AvIfWXy8IcfvKc5sI8tvR7YKKMSMCqESN1EbKmA1k2asbL1IawkFbHsLpQ' })
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
                        // console.log(response.data.userSettings.replaces)
                        console.log(userId," 2 ", username," 3 ", email," 4 ", roles)
                        var sourceOfTruth = {userId, username}


                        commit('auth_work')
                    })

            })
        },
        profileUser({commit}, user) {   ///просмотр инфы о пользователе
            return new Promise((resolve, reject) => {
                commit('auth_success')
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
                commit('auth_success')
                axios.get('http://127.0.0.1:8080/api/v1/users/me/settings', {headers: {Authorization: "Bearer " + localStorage.token}})
                    .then(response => {
                        mySettingsd = response.data
                        console.log(response)
                        console.log(mySettingsd)
                        this.$emit('settings', this.mySettingsd)
                    })
            })
        },
        myReplaces({commit}, user) {    //посмотреть свои замены
            return new Promise((resolve, reject) => {
                commit('auth_success'),
                    axios.get('http://127.0.0.1:8080/api/v1/users/me/settings/replaces', {headers: {Authorization:  "Bearer " + localStorage.token, }})
                        .then(response => {
                            console.log(response)
                        })
            })
        },
        myNewUsername({commit}, username, NewUsername, token) {   // ПЕРЕИМЕНОВАТЬ ПОЛЬЗОВАТЕЛЯ
            return new Promise((resolve, reject) => {
                const config = {
                    headers: { Authorization: 'Bearer ' + localStorage.token }};
                const username = NewUsername
                commit('auth_work'),
                    // axios.put('http://127.0.0.1:8080/api/v1/users/me/username', { headers: {Authorization: 'Bearer '+ localStorage.token}, username})
                axios.put('http://127.0.0.1:8080/api/v1/users/me/username', {username}, config)
                        .then(response => {
                            commit('logout')
                            localStorage.removeItem(token)
                            delete  axios.defaults.headers.common('Authorization')
                            resolve(response)
                            console.log(response)

                        })
                        .catch(err => {
                            commit('work_error')
                            reject(err)
                            console.log(err)
                        })
            })
        },
        myNewPassword({commit}, username, token, NewPassword ) {  // СМЕНИТЬ ПАРОЛЬ
            return new Promise((resolve, reject) => {
                const config = {
                    headers: { Authorization: 'Bearer ' + localStorage.token }};
                commit('auth_work'),
                    //axios.put('http://127.0.0.1:8080/api/v1/users/me/password', { headers: {Authorization: 'Bearer
                // ' + localStorage.token}, myNewPassword })
                axios.post('http://127.0.0.1:8080/api/v1/users/me/password', {NewPassword}, config)
                        .then(response => {
                            resolve(response)
                            console.log(response)
                            commit('auth_success')
                        })
                        .catch(error => {
                            commit('auth_success')
                            reject(error)
                            console.log(error)
                        })
            })
        },
        myReplacesSet({commit}, username, token, replaces) {  //задать свои замены
            return new Promise((resolve, reject) => {
                const config = {
                    headers: { Authorization: 'Bearer ' + localStorage.token }};
                commit('auth_success'),
                    console.log(replaces)
                    axios.put('http://127.0.0.1:8080/api/v1/users/me/settings/replaces', {replaces },  config )
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
        analyseText({commit}, username, token, originalText) {
            return new Promise((resolve, reject) => {
                const config = {
                    headers: { Authorization: 'Bearer ' + localStorage.token }
                };
                commit("auth_success"),
                    axios.post('http://127.0.0.1:8080/analyse', {originalText}, config)
                        .catch(error => {
                            reject(error)
                            console.log(error.response.data)
                        })
            })
        }

    },


    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    }
})
