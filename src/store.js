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
                axios({
                    url: 'http://45.90.35.103:8080/api/v1/auth/login',
                    data: dat,
                    method: 'POST'})
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
                            alert('Сервер не отвечает')
                        }
                        if (error.response.status === 401) {
                            console.log('invalid user or pass')
                            alert('Неправильный логин или пароль. Попробуйте ещё раз.')
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
                axios({
                    url: 'http://45.90.35.103:8080/api/v1/auth/register',
                    data: user,
                    method: 'POST'
                })
                    .then(response => {
                        // alert('Регистрация прошла успешно')
                        // const token = resp.data.token
                        // const user = resp.data.user
                        // localStorage.setItem('token', token)
                        // // Add the following line:
                        // axios.defaults.headers.common['Authorization'] = token
                        // commit('auth_success', token, user)
                        console.log("регистрация успешна")
                        commit('logout')
                        resolve(response)
                    })
                    .catch(error => {
                        if (!error.response) {
                            console.log('сервер лежит')
                            // router.push('/errorserver')
                            alert('Сервер не отвечает')
                        }
                        if (error.response.status === 400) {
                            console.log('error 400')
                            alert('Неизвестная ошибка. Обратитесь к разработчику. Код ошибки: 400')
                            // router.push('/error400')
                        }
                        // commit('auth_error', error)
                        // localStorage.removeItem('token')
                        if (error.response.data.message === "Error: Username is already taken!") {
                            console.log('error username')
                            //router.push('/errorusername')
                            router.back()
                            alert('Данное имя пользователя уже занято')
                            // commit('logout')
                        } if (error.response.data.message === "Error: Email is already in use!") {
                            console.log('error EMAIL')
                           // router.push('/erroremail')
                            router.back()
                            alert('Данная электронная почта уже используется')
                            // commit('logout')
                        }
                        reject(error)
                       console.log(error.response.data)
                    })
            })
        },
        logout({commit}) {     //// ВЫХОД
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.removeItem('token')
                // localStorage.clear()      // ПОЛНАЯ ОЧИСТКА ХРАНИЛИЩА
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        },
        myProfile({commit} ) {   ///просмотр инфы о себе
            return new Promise((resolve, reject) => {
                const token = localStorage.token
                commit('auth_success', token)
                // commit('auth_success')
                axios.get('http://45.90.35.103:8080/api/v1/users/me', {
                    headers: {Authorization: 'Bearer ' + this.state.token}
                })
                    .then(response => {
                        const userId = response.data.id
                        const username = response.data.username
                        const email = response.data.email
                        const roles = response.data.roles
                        const userSettings = response.data.userSettings
                        const replaces = response.data.userSettings.replaces
                        const up = response.data.id
                        const  parsed = JSON.stringify(up)
                        const parsed2 = 'id пользователя '+parsed+' логин '+'"'+username+'"'+' почта '+email
                        sessionStorage.setItem('idp', parsed )
                        sessionStorage.setItem('loginu', username)
                        sessionStorage.setItem('emailu', email)
                        // sessionStorage.setItem('uname', username)
                        // console.log(response)
                        // console.log(response.data.id+'cl1')
                        console.log(sessionStorage.up + '  store')
                        console.log(response)
                        alert('Информация получена, нажмите кнопку "Просмотреть информацию о профиле"')
                        // console.log(" 2 ", username," 3 ", email," 4 ", roles)
                        // commit('auth_work', token)
                        // commit('auth_success',   username)
                    })
                    .catch(error => {
                        if (!error.response) {
                            console.log('сервер лежит')
                            alert('Сервер не отвечает')
                           // router.push('/errorserver')
                        }
                        if (error.response.status === 401 ) {
                            commit('logout')
                            localStorage.removeItem('token')
                            alert('Ошибка. необходимо перезайти.')
                        }
                        console.log('errorstore='+ error)
                        reject(error)
                    })

            })
        },
        profileUser({commit}, user) {   ///просмотр инфы о пользователе
            return new Promise((resolve, reject) => {
                axios.get('http://45.90.35.103:8080/api/v1/users/{id}', {
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
                            alert('Сервер не отвечает')
                           // router.push('/errorserver')
                        }
                    })
            })
        },
        mySettings({commit}, user, mySettingsd) {  // посмотреть свои настройки
            return new Promise((resolve, reject) => {
                const token = localStorage.token
                commit('auth_work', token)
                // commit('auth_success')
                axios.get('http://45.90.35.103:8080/api/v1/users/me/settings', {headers: {Authorization: "Bearer " + localStorage.token}})
                    .then(response => {
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
                            alert('Сервер не отвечает')
                            //router.push('/errorserver')
                        }
                        if (error.response.status === 401 ) {
                            commit('logout')
                            localStorage.removeItem('token')
                            alert('Ошибка. необходимо перезайти.')
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
                    axios.get('http://45.90.35.103:8080/api/v1/users/me/settings/replaces', {headers: {Authorization:  "Bearer " + localStorage.token, }})
                        .then(response => {
                            const repl = response.data
                            const parsed = JSON.stringify(repl)
                            sessionStorage.setItem('repla', parsed)
                            console.log(parsed)
                            alert('Информация получена, нажмите кнопку "Посмотреть список замен символов"')
                            // this.$storage.set('replacez',{parsed},{ttl:10*1000})
                            // console.log(response.data)
                        })
                        .catch(error => {
                            if (!error.response) {
                                console.log('сервер лежит')
                                alert('Сервер не отвечает')
                                
                               // router.push('/errorserver')
                            }
                            if (error.response.status === 401 ) {
                                commit('logout')
                                localStorage.removeItem('token')
                                alert('Ошибка. необходимо перезайти.')
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
                    axios({
                        url:'http://45.90.35.103:8080/api/v1/users/me/username',
                        data:user,
                        headers: { Authorization: 'Bearer ' + localStorage.token },
                        method:"PUT"}, config )
                        .then(
                            response => {
                            // localStorage.removeItem('token')
                            // delete  axios.defaults.headers.common('Authorization')
                            alert('Имя успешно изменено, перезайдите.')
                            // commit('logout')
                            // console.log(response)
                            // console.log(user+'  user')
                            resolve(response)
                        }, console.log(user))
                        .catch(error => {
                            if (error.response.status != 200) {
                                if (!error.response) {
                                console.log('сервер лежит')
                                alert('Сервер не отвечает')}
                               // router.push('/errorserver')
                            }
                            if (error.response.status === 400) {
                                console.log('error 400')
                                alert('Неизвестная ошибка. Обратитесь к разработчику. Код ошибки: 400')
                                // router.push('/error400')
                            }
                            if (error.response.status === 401 ) {
                                commit('logout')
                                localStorage.removeItem('token')
                                alert('Ошибка. необходимо перезайти.')
                            }
                            // commit('work_error')
                            reject(error)
                            // console.log(error)
                            // console.log(error.response.data)
                        })
            })
        },
        myNewPassword({commit}, user, token, NewPassword, origPassword, nPassword, nPasswordConfirm ) {  // СМЕНИТЬ ПАРОЛЬ
            return new Promise((resolve, reject) => {
                const config = {
                    headers: { Authorization: 'Bearer ' + localStorage.token }};
                const kav= '"';
                    axios({
                        url: 'http://45.90.35.103:8080/api/v1/users/me/password',
                        data: user,
                        method: 'PUT',
                        headers: { Authorization: 'Bearer ' + localStorage.token }
                    })
                        .then(response => {
                            alert('Смена пароля прошла успешно. Не забудьте записать его.')
                            resolve(response)
                            console.log(response)
                            console.log(user)
                        })
                        .catch(error => {
                            if (!error.response) {
                                console.log('сервер лежит')
                                alert('Сервер не отвечает')
                                // router.push('/errorserver')
                            }
                            if (error.response.status === 401 ) {
                                commit('logout')
                                localStorage.removeItem('token')
                                alert('Ошибка. необходимо перезайти.')
                            }
                            if (error.response.message === "Check the current password") {
                                console.log('error current pass')
                                alert('Неправильный текущий пароль')
                                // router.push('/errorcurrentpass')
                            }
                            if (error.response.message === 'New password mismatch') {
                                console.log('error pass confirm')
                                alert('Новый пароль не совпадает с подтверждением')
                                //router.push('/errorconfpass')
                            }

                            console.log(error)
                            reject(error)
                            // commit('auth_success')
                        })
            })
        },
        myReplacesSet({commit}, user, token, replaces) {  //задать свои замены
            return new Promise((resolve, reject) => {
                // const config = {
                //     headers: { Authorization: 'Bearer ' + localStorage.token }};
                const rep = user.replaces
                // const rep = user;
                // const rep ={"к":"г"}
                // const rep2 = JSON.stringify(rep.replaces)
                    console.log(replaces)
                        axios ({
                            url: 'http://45.90.35.103:8080/api/v1/users/me/settings/replaces',
                            data: rep,
                            method: 'POST',
                            headers: { Authorization: 'Bearer ' + localStorage.token, "Content-Type": "application/json" }
                        })
                        .then(response => {
                            alert('Добавлено')
                            console.log(response)
                            resolve(response)
                        })
                        .catch(error =>{
                            if (error.response.status != 200) {
                                if (!error.response) {
                                    console.log('сервер лежит')
                                    alert('Сервер не отвечает')}
                                // router.push('/errorserver')
                            }
                            if (error.response.status === 400) {
                                console.log('error 400')
                                console.log(error.response)
                                alert('Неизвестная ошибка. Обратитесь к разработчику. Код ошибки: 400')
                                // router.push('/error400')
                            }
                            if (error.response.status === 401 ) {
                                commit('logout')
                                localStorage.removeItem('token')
                                alert('Ошибка. необходимо перезайти.')
                            }
                            if (error.response.status === 415) {
                                console.log('error 415')
                                console.log(rep.replaces)
                                alert('Неизвестная ошибка, обратитесь к разработчику. Код ошибки: 400')
                                // router.push('/error400')
                            }
                            reject(error)
                            console.log(error.response.data)
                            console.log(localStorage.token)
                        })
            })
        },
        myReplacesAdd({commit}, user, token, replaces) {  //задать свои замены
            return new Promise((resolve, reject) => {
                // const config = {
                //     headers: { Authorization: 'Bearer ' + localStorage.token }};
                const rep = user.replaces
                // const rep = user;
                // const rep ={"к":"г"}
                // const rep2 = JSON.stringify(rep.replaces)
                console.log(replaces)
                axios ({
                    url: 'http://45.90.35.103:8080/api/v1/users/me/settings/replaces',
                    data: rep,
                    method: 'PUT',
                    headers: { Authorization: 'Bearer ' + localStorage.token, "Content-Type": "application/json" }
                })
                    .then(response => {
                        alert('Добавлено')
                        console.log(response)
                        resolve(response)
                    })
                    .catch(error =>{
                        if (error.response.status != 200) {
                            if (!error.response) {
                                console.log('сервер лежит')
                                alert('Сервер не отвечает')}
                            // router.push('/errorserver')
                        }
                        if (error.response.status === 400) {
                            console.log('error 400')
                            console.log(error.response)
                            alert('Неизвестная ошибка. Обратитесь к разработчику. Код ошибки: 400')
                            // router.push('/error400')
                        }
                        if (error.response.status === 401 ) {
                            commit('logout')
                            localStorage.removeItem('token')
                            alert('Ошибка. необходимо перезайти.')
                        }
                        if (error.response.status === 415) {
                            console.log('error 415')
                            console.log(rep.replaces)
                            alert('Неизвестная ошибка, обратитесь к разработчику. Код ошибки: 400')
                            // router.push('/error400')
                        }
                        reject(error)
                        console.log(error.response.data)
                        console.log(localStorage.token)
                    })
            })
        },

        analyseText({commit}, user, username, token, originalText) {
            return new Promise((resolve, reject) => {
                const rep = localStorage.getItem('dorep')  //НЕ УДАЛЯТЬ
                        axios({
                            url: 'http://45.90.35.103:8080/api/v1/document/analyse',
                            data: user,
                            method: 'POST',
                            headers: { Authorization: 'Bearer ' + localStorage.token },
                            params:  {doReplaces: rep}
                            // params: user.doReplaces
                        })
                        .then(response => {
                            const analysedText = response.data
                            // console.log(response.data)
                            // console.log(rep)
                            const parsed = JSON.stringify(analysedText);
                            localStorage.setItem('antext', parsed)
                            localStorage.setItem('wlist', parsed)
                            console.log(user)
                            alert ('Текст успешно обработан. Нажмите кнопку "Просмотреть результат')
                            // commit('auth_success')
                        })
                        .catch(error => {
                            if (!error.response) {
                                console.log('сервер лежит')
                                alert('Сервер не отвечает')
                                // router.push('/errorserver')
                            }
                            if (error.response.status === 400) {
                                console.log('error 400')
                                alert('Неизвестная ошибка. Обратитесь к разработчику. Код ошибки: 400')

                            }
                            if (error.response.status === 401 ) {
                                commit('logout')
                                localStorage.removeItem('token')
                                alert('Ошибка. необходимо перезайти.')
                            }
                            if (error.response.status === 500) {
                                console.log('error json')
                                alert('Ошибка сервера, обратитесь к разработчику. Код ошибки: 500')
                            }
                            reject(error)
                            console.log(error.response.data)
                        })
            })
        },

        saveAnalyse({commit}, user ) {
            return new Promise((resolve, reject) => {
                axios({
                    url: 'http://45.90.35.103:8080/api/v1/document/save',
                    data: user,
                    method: 'POST',
                    headers: { Authorization: 'Bearer ' + localStorage.token }
                })
                    .then(response => {
                        if (response.status === 201) {
                            alert('Сохранено')
                            console.log(response.status)
                            console.log(user)
                        }

                    })
                    .catch(error => {
                        if (!error.response) {
                            console.log('сервер лежит')
                            alert('Сервер не отвечает')
                            console.log(user)
                            // router.push('/errorserver')
                        }
                        if (error.response.status === 400) {
                            console.log('error 400')
                            alert('Неизвестная ошибка. Обратитесь к разработчику. Код ошибки: 400')
                            console.log(user)
                            // router.push('/error400')
                        }
                        if (error.response.status === 401 ) {
                            commit('logout')
                            localStorage.removeItem('token')
                            alert('Ошибка. необходимо перезайти.')
                        }
                        if (error.response.status === 500) {
                            console.log('error json')
                            alert('Ошибка формата данных, обратитесь к разработчику. Код ошибки: 400')
                        }
                        reject(error)
                        console.log(error)
                    })
            })
        },
        searchCorpus ({commit}, user) {
            return new Promise( (resolve, reject) =>{
                axios ({
                    url:'http://45.90.35.103:8080/api/v1/document/search',
                    data: user,
                    method:'POST',
                    headers: { Authorization: 'Bearer ' + localStorage.token },
                    params: { page: localStorage.page }
                })
                    .then(response => {
                        if (response.data.length === 0) {
                            alert('По вашему запросу ничего не найдено')
                        } else {
                            const sear = response.data
                            const parsed = JSON.stringify(sear)
                            localStorage.setItem('searres', parsed)
                            console.log(user)
                            console.log(response)
                            alert('Для просмотра результатов поиска нажмите кнопку "Просмотреть"')
                        }
                    })
                    .catch(error => {
                        if (!error.response) {
                            console.log('сервер лежит')
                            alert('Сервер не отвечает')
                            console.log(user)
                            console.log('page '+localStorage.page)
                            // router.push('/errorserver')
                        }
                        if (error.response.status === 400) {
                            console.log('error 400')
                            alert('Неизвестная ошибка. Обратитесь к разработчику. Код ошибки: 400')
                            // router.push('/error400')
                        }
                        if (error.response.status === 401 ) {
                            commit('logout')
                            localStorage.removeItem('token')
                            alert('Ошибка. необходимо перезайти.')
                        }
                        if (error.response.status === 500) {
                            console.log('error json')
                            alert('Ошибка формата данных, обратитесь к разработчику. Код ошибки: 500')
                            console.log(user, localStorage.page)
                        }
                        reject(error)
                        console.log(error.response.data)
                    })
            })
        },
        getCoprus ({commit}, user ) {
            return new Promise( (resolve, reject) => {
                axios({
                    url: 'http://45.90.35.103:8080/api/v1/document/'+user,
                    method: 'GET',
                    headers: { Authorization: 'Bearer ' + localStorage.token }
                })
                    .then( response => {
                        const corp = response.data
                        const parsed = JSON.stringify(corp)
                        localStorage.setItem('corp', parsed)
                        alert('Для просмотра результатов поиска нажмите кнопку "Просмотреть"')
                        console.log(response)
                        console.log(user)
                    })
                    .catch(error => {
                        if (!error.response) {
                            console.log('сервер лежит')
                            alert('Сервер не отвечает')
                            console.log(user)
                            // router.push('/errorserver')
                        }
                        if (error.response.status === 400) {
                            console.log('error 400')
                            alert('Неизвестная ошибка. Обратитесь к разработчику. Код ошибки: 400')
                            console.log(user)
                            // router.push('/error400')
                        }
                        if (error.response.status === 401 ) {
                            commit('logout')
                            localStorage.removeItem('token')
                            alert('Ошибка. необходимо перезайти.')
                        }
                        if (error.response.status === 404) {
                            console.log('error 404')
                            alert('По указанным параметром не удалось ничего найти')
                            console.log(user)
                            // router.push('/error400')
                        }
                        console.log(error)
                        reject(error)
                    })
            })
        },
        getMyCorpus ({commit}, user ) {
            return new Promise( (resolve, reject) => {
                axios({
                    url: 'http://45.90.35.103:8080/api/v1/document/user/me',
                    method: 'GET',
                    headers: { Authorization: 'Bearer ' + localStorage.token }
                })
                    .then( response => {
                        const corp = response.data
                        const parsed = JSON.stringify(corp)
                        localStorage.setItem('mycorp', parsed)
                        console.log(response)
                        console.log(user)
                    })
                    .catch(error => {

                        console.log(error)
                        reject(error)
                    })
            })
        },
        editCorpus ({commit}, user) {
            return new Promise( (resolve, reject) => {
                axios({
                    url:'http://45.90.35.103:8080/api/v1/document/'+id,
                    method: 'PUT',
                    headers: { Authorization: 'Bearer ' + localStorage.token }
                })
            })
        },
        deleteCorpus ({commit}, user) {
            return new Promise( (resolve, reject) => {
                axios({
                    url:'http://45.90.35.103:8080/api/v1/document/'+user,
                    method: 'DELETE',
                    headers: { Authorization: 'Bearer ' + localStorage.token }
                })
                    .then(response => {
                        console.log(response)
                        alert('Указанный корпус удалён')
                    })
                    .catch(error => {
                        if (!error.response) {
                            console.log('сервер лежит')
                            alert('Сервер не отвечает')
                            console.log(user)
                            // router.push('/errorserver')
                        }
                        if (error.response.status === 400) {
                            console.log('error 400')
                            alert('Неизвестная ошибка. Обратитесь к разработчику. Код ошибки: 400')
                            console.log(user)
                            // router.push('/error400')
                        }
                        if (error.response.status === 401 ) {
                            commit('logout')
                            localStorage.removeItem('token')
                            alert('Ошибка. необходимо перезайти.')
                        }
                        console.log(error)
                    })
            })
        },
    },


    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        getText: state => state.originalText,
        getUserid: state => state.username,
    }
})
