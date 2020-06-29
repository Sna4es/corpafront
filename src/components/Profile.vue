<template>
    <div>
        <form @submit.prevent="checkProfile" class="checkP">
            <h2>Личный кабинет пользователя</h2>
            <button class="button" type="submit">Запросить информацию о своём профиле</button>
<!--            <hr/>-->
<!--&lt;!&ndash;            <textarea class="textarea1" v-model="userinf"></textarea>&ndash;&gt;-->
<!--             {{ idp }}-->
<!--            <hr/>-->
<!--             {{ loginu }}-->
<!--            <hr/>-->
<!--            {{ emailu }}-->
        </form>
        <hr/>
        <form @submit.prevent="seeProfile" class="seeP">
            <button @submit.prevent="seeProfile" class="button" type="submit">Посмотреть информацию о профиле</button>
            <hr/>
            {{ idp }}
            <hr/>
            {{ loginu }}
            <hr/>
            {{ emailu }}
            <hr/>
        </form>
<!--        <form @submit.prevent="checkSettings" class="checkS">-->
<!--            <button class="button" type="submit">Проверить </button>-->
<!--&lt;!&ndash;            <input type="text" v-model="setti">  настройки профиля &ndash;&gt;-->
<!--            <hr/> {{ setti }}-->
<!--        </form>-->
<!--        <hr/>-->
        <hr/>
        <form @submit.prevent="checkReplaces" class="checkR">
            <button class="button" type="submit">Запросить список замен символов </button>
            <!--            <input type="text" v-model="reppl">-->
            <hr/>
        </form>
        <form @submit.prevent="seeReplaces" class="seeR">
        <button @submit.prevent="seeReplaces" type="submit" class="button">Посмотреть список замен символов</button>
            <hr/>
            {{ reppl }}
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
            <form @submit.prevent="setReplace" class="addReplace">
                <input type="text" v-model="newReplace" placeholder='символ : символ '>
                <hr/>
<!--                <input type="origsym" v-model="origsym" placeholder='заменяемый символ'>-->
<!--                <hr/>-->
<!--                <input type="repsym" v-model="repsym" placeholder='заменяющий символ'>-->
<!--                <hr/>-->
                <button class="button" type="submit">Задать замены</button>
            </form>
            <form @submit.prevent="addReplace" class="addReplace">
                <hr/>
                <button class="button" type="submit">Добавить замены</button>
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
                    // this.userinf = sessionStorage.getItem('up'),
                    // this.idp ='ID пользователя:' + sessionStorage.getItem('idp'),
                    // this.loginu ='Имя пользователя:' + sessionStorage.getItem('loginu'),
                    // this.emailu ='Электронная почта:' + sessionStorage.getItem('emailu'),
                    // console.log(userinf)
                    )
                .catch(error => {
                    // if (error.response.status === 401){
                    //     this.$router.push('/errorauth')
                    // }
                    console.log(error)
                })

            },
            seeProfile: function () {
                this.userinf = sessionStorage.getItem('up'),
                    this.idp ='ID пользователя:' + sessionStorage.getItem('idp'),
                    this.loginu ='Имя пользователя:' + sessionStorage.getItem('loginu'),
                    this.emailu ='Электронная почта:' + sessionStorage.getItem('emailu')
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
                // this.reppl='Список заменяемых символов:' + (sessionStorage.getItem('repla'))
            },
            seeReplaces: function () {
                this.reppl='Список заменяемых символов:' + (sessionStorage.getItem('repla'))
            },
            userRename: function () {
                let username = this.username
                if (username != "") {
                    this.$store.dispatch('myNewUsername', {username})
                        .then(() => console.log('rename succes'))
                        .catch(error => {
                            // this.$router.push('/login')
                            console.log(error)
                        })
                } else { alert('Введите желаемое имя пользователя')}
            },
            updatePassword: function () {
                let currentPassword = this.currentPassword
                let newPassword = this.newPassword
                let newPasswordConfirm = this.newPasswordConfirm
                if (newPassword != "" || newPasswordConfirm !="" || newPassword.length <=8) {
                    this.$store.dispatch('myNewPassword', {currentPassword, newPassword, newPasswordConfirm})
                        .then(console.log('pass update'))
                        .catch(error => {
                            this.$router.push('/home')
                            console.log(error)
                            this.$store.dispatch('logout')
                        })
                } else  {
                    alert('Вы не ввели новый пароль или его подтверждение')
                }
            },
            setReplace: function () {
                let newReplace = this.newReplace
                let str1 = newReplace.replace(/:/gi, '":"')
                let str2 = str1.replace(/,/gi,'","')
                let str3 = str2.replace(/ /gi, '')
                let replaces = '{"' + str3 + '"}'
                // alert(replaces)
                this.$store.dispatch('myReplacesSet', {replaces})

                .catch(error => {
                    // this.$router.push('/error')
                    console.log(error)
                    console.log(replaces + 'profile')
                })
            },
            addReplace: function () {
                let newReplace = this.newReplace
                let str1 = newReplace.replace(/:/gi, '":"')
                let str2 = str1.replace(/,/gi,'","')
                let str3 = str2.replace(/ /gi, '')
                let replaces = '{"' + str3 + '"}'
                // alert(replaces)
                this.$store.dispatch('myReplacesAdd', {replaces})

                    .catch(error => {
                        // this.$router.push('/error')
                        console.log(error)
                        console.log(replaces + 'profile')
                    })
            }
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