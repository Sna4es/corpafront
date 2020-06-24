<template>
    <div>
        <form @submit.prevent="checkProfile" class="checkP">
            <button class="button" type="submit">Проверить свой профиль</button>
            <hr/>
<!--            <textarea class="textarea1" v-model="userinf"></textarea>-->
             {{ idp }}
            <hr/>
             {{ loginu }}
            <hr/>
            {{ emailu }}
        </form>
        <hr/>
        <form @submit.prevent="checkSettings" class="checkS">
            <button class="button" type="submit">Проверить </button>
<!--            <input type="text" v-model="setti">  настройки профиля -->
            <hr/> {{ setti }}
        </form>
        <hr/>
        <form @submit.prevent="checkReplaces" class="checkR">
            <button class="button" type="submit">Проверить </button>
<!--            <input type="text" v-model="reppl">-->
            <hr/>
              {{ reppl }}
            <hr/> {{ setti }}
        </form>
<!--        <hr/>-->
        <h2>Смена имени пользователя</h2>
        <form @submit.prevent="userRename" class="userRename">
            <input type="text" v-model="username" placeholder="Новое имя пользователя">
            <button class="button" type="submit">Сменить имя пользователя</button>
        </form>
        <h2>Смена пароля</h2>
        <form @submit.prevent="updatePassword" class="updatePassword">
            <input type="password" v-model="currentPassword" placeholder="Старый пароль">
            <hr/>
            <input type="password" v-model="newPassword" placeholder="Новый пароль">
            <hr/>
            <input type="password" v-model="newPasswordConfirm" placeholder="Подтвердите новый пароль">
            <hr/>
            <button class="button" type="submit">Сменить пароль</button>
            <h2>Добавление символов для замены</h2>
            <form @submit.prevent="addReplace" class="addReplace">
                <input type="text" v-model="newReplace" placeholder='символ : символ '>
                <hr/>
<!--                <input type="origsym" v-model="origsym" placeholder='заменяемый символ'>-->
<!--                <hr/>-->
<!--                <input type="repsym" v-model="repsym" placeholder='заменяющий символ'>-->
<!--                <hr/>-->
                <button class="button" type="submit">Добавить замену</button>
            </form>
        </form>
    </div>
</template>




<script>
    export default {
        data() {
            return {
                newUsername: '',
                newReplace: '',
                profileInfo: {},
                origPassword: '',
                nPassword: '',
                nPasswordConfirm: '',
                username: '',
                reppl: '',
                userinf:'',
                idp:'',
                loginu:'',
                emailu:'',
                setti: '',
                currentPassword: '',
                newPassword: '',
                newPasswordConfirm: '',
                origsym: '',
                repsym: '',
            }

        },
        replacesres: '+51351351',
        replaces: '',
        methods: {
            checkProfile: function () {
                // let userinf = ''
                // let idp = ''
                // let loginu = ''
                // let emailu = ''
                this.$store.dispatch("myProfile")
                .then(() =>
                console.log(this.getters.isLoggedIn, 'afsf'),
                    // console.log(localStorage.getItem('up')+' profilevue'),
                    this.userinf = sessionStorage.getItem('up'),
                    this.idp ='ID пользователя:' + sessionStorage.getItem('idp'),
                    this.loginu ='Имя пользователя:' + sessionStorage.getItem('loginu'),
                    this.emailu ='Электронная почта:' + sessionStorage.getItem('emailu'),
                    console.log(userinf)
                    )
                .catch(error => {
                    // if (error.response.status === 401){
                    //     this.$router.push('/errorauth')
                    // }
                    console.log(error)
                })

            },
            checkSettings: function () {
                var setti
                this.$store.dispatch('mySettings')
                    .then(() =>
                        console.log(this.$store.getters.isLoggedIn),
                        // console.log(localStorage.getItem('mysett')+'tes'),
                        // console.log(localStorage.getItem('repla')+'repla'),
                        this.setti ='Настройки профиля:' + (localStorage.getItem('mysett')),
                        console.log(setti+'setti')
                    )

                .catch(error => {
                    // if (error.response.status === 401 ) {
                    //     this.$router.push('/errorauth')
                    // }
                    console.log(error)
                })
            },
            checkReplaces: function () {
                let reppl = ''
                this.$store.dispatch('myReplaces')
                .then(() => console.log(this.$store.getters.isLoggedIn),

                    console.log(reppl+'reppl ssss')
                )
                .catch(error => {
                    // if (error.response.status === 401) {
                    //     this.$router.push('/errorauth')
                    // }
                    console.log(error)
                })
                this.reppl='Список заменяемых символов:' + (sessionStorage.getItem('repla'))
            },
            // checkReplaces: function () {
            //     this.$store.dispatch('myReplaces')
            //         .then(() =>
            //             console.log(localStorage.getItem('repla')+'repla')
            //         )
            //     .catch(error => {
            //         this.$router.push('/login')
            //         console.log(error)
            //     })
            // },
            userRename: function () {
                let username = this.username;
                this.$store.dispatch('myNewUsername', {username})
                    .then(() => console.log('rename succes'))
                .catch(error => {
                    // this.$router.push('/login')
                    console.log(error)
                })
            },
            updatePassword: function () {
                let currentPassword = this.currentPassword
                let newPassword = this.newPassword
                let newPasswordConfirm = this.newPasswordConfirm
                this.$store.dispatch('myNewPassword', {currentPassword, newPassword, newPasswordConfirm})
                    .then( console.log('pass update'))
                    .catch(error => {
                        this.$router.push('/home')
                        console.log(error)
                        this.$store.dispatch('logout')
                    })
            },
            addReplace: function () {
                let lev = '"{'
                let sr = ':'
                let prav = '}"'
                let origsym = this.origsym
                let repsym = this.repsym
                // let replaces = lev+origsym+sr+repsym+prav
                // let replaces = this.replaces
                // let replaces = 'additionalProp1" : "string'
                let replaces = this.newReplace
                this.$store.dispatch('myReplacesSet', {replaces})
                .catch(error => {
                    this.$router.push('/error')
                    console.log(error)
                    console.log(replaces)
                })
            },
            // userInfo: function () {
            //     this.$store.state.
            //
            //
            // }
        },

    }
</script>

<style scoped>
    .textarea1 {
        border: none;
        width: 1000px;
        height: 150px;
    }

</style>