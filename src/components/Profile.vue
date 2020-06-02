<template>
    <div>
        <form @submit.prevent="checkProfile" class="checkP">
            <button type="submit">check profile</button>
        </form>
        <form @submit.prevent="checkSettings" class="checkS">
            <button type="submit">check settings</button>
<!--            <input type="text" v-model="setti">-->
            {{ setti }}
        </form>
        <form @submit.prevent="checkReplaces" class="checkR">
            {{ reppl }}
            <button type="submit">check replaces</button>
            <input type="text" v-model="reppl">
        </form>
        <form @submit.prevent="userRename" class="userRename">
            <input type="text" v-model="username" placeholder="Новое имя пользователя">
            <button type="submit">Сменить</button>
        </form>
        <form @submit.prevent="updatePassword" class="updatePassword">
            <input type="password" v-model="origPassword" placeholder="Старый пароль">
            <input type="password" v-model="nPassword" placeholder="Новый пароль">
            <input type="password" v-model="nPasswordConfirm" placeholder="Подтвердите новый пароль">
            <button type="submit">Сменить пароль</button>
            <form @submit.prevent="addReplace" class="addReplace">
                <input type="text" v-model="newReplace" placeholder='{"буква":"буква"}'>
                <button type="submit">Добавить замену</button>
            </form>
        </form>
    </div>
</template>




<script>
    export default {
        data() {
            return {
                newUsername: '',
                newPassword: '',
                newReplace: '',
                profileInfo: {},
                origPassword: '',
                nPassword: '',
                nPasswordConfirm: '',
                username: '',
                setti: '',
            }
        },
        reppl: '13131351',
        replacesres: '+51351351',
        replaces: '',
        methods: {
            checkProfile: function () {
                this.$store.dispatch("myProfile")
                .then(() =>
                console.log(this.getters.isLoggedIn, 'afsf'),  console.log(localStorage.getItem('up')+' profilevue'),
                    )
                .catch(error => {
                    // if (error.response.status === 401){
                    //     this.$router.push('/errorauth')
                    // }
                    console.log(error)
                })

            },
            checkSettings: function () {
                let setti = ''
                this.$store.dispatch('mySettings')
                    .then(() =>
                        console.log(this.$store.getters.isLoggedIn),
                        console.log(localStorage.getItem('mysett')+'tes'),
                        console.log(localStorage.getItem('repla')+'repla'),
                        this.setti = (localStorage.getItem('mysett')),
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
                    this.replacesres=(sessionStorage.getItem('repla'))
                )
                .catch(error => {
                    // if (error.response.status === 401) {
                    //     this.$router.push('/errorauth')
                    // }
                    console.log(error)
                })
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
                    .then(() => this.$router.push('/login'))
                .catch(error => {
                    this.$router.push('/login')
                    //console.log(error)
                })
            },
            updatePassword: function () {
                let origPassword = this.origPassword
                let nPassword = this.nPassword
                let nPasswordConfirm = this.nPasswordConfirm
                this.$store.dispatch('myNewPassword', {origPassword, nPassword, nPasswordConfirm})
                    .then( console.log('pass update'))
                    .catch(error => {
                        this.$router.push('/home')
                        console.log(error)
                        this.$store.dispatch('logout')
                    })
            },
            addReplace: function () {
                let replaces = this.replaces
                this.$store.dispatch('myReplacesSet', {replaces})
                .catch(error => {
                    this.$router.push('/error')
                    console.log(error)
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

</style>