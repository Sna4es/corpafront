<template>
    <div>
        <form @submit.prevent="checkProfile" class="checkP">
            <button type="submit">check profile</button>
        </form>
        <form @submit.prevent="checkSettings" class="checkS">
            <button type="submit">check settings</button>
        </form>
        <form @submit.prevent="checkReplaces" class="checkR">
            <button type="submit">check replaces</button>
        </form>
        <form @submit.prevent="addReplace" class="addReplace">
            <input type="text" v-model="newReplace" placeholder='{"буква":"буква"}'>
            <button type="submit">Добавить замену</button>
        </form>
        <form @submit.prevent="userRename" class="userRename">
            <input type="text" v-model="newUsername" placeholder="Новое имя пользователя">
            <button type="submit">Сменить</button>
        </form>
        <form @submit.prevent="updatePassword" class="updatePassword">
            <input type="password" v-model="newPassword" placeholder="Новый пароль">
            <button type="submit">Сменить пароль</button>
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

            }
        },
        methods: {
            checkProfile: function () {
                this.$store.dispatch("profileMe")
                console.log(this.$store.$$state.userId, 'dsafsdfg')

            },
            checkSettings: function () {
                this.$store.dispatch('mySettings')
            },
            checkReplaces: function () {
                this.$store.dispatch('myReplaces')
            },
            userRename: function () {
                let newUsername = this.newUsername;
                this.$store.dispatch('myNewUsername', {newUsername})
                    .then(() => this.$router.push('/login'))
                .catch(error => {
                    this.$router.push('/login')
                    console.log(error)
                })
            },
            updatePassword: function () {
                let newPassword = this.newPassword
                this.$store.dispatch('myNewPassword', {newPassword})
                    .catch(error => {
                        this.$router.push('/home')
                        console.log(error)
                        this.$store.dispatch('logout')
                    })
            },
            addReplace: function () {
                let newReplace = this.newReplace
                this.$store.dispatch('myReplacesSet', {newReplace})
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