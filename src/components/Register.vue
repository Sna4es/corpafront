import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

<template>
    <div>
        <h4>Register</h4>
        <form @submit.prevent="register">
            <label for="username">Имя пользователя</label>
            <div>
                <input id="username" type="text" v-model="username" required autofocus>
            </div>

            <label for="email" >E-Mail</label>
            <div>
                <input id="email" type="email" v-model="email" required>
            </div>
             
            <label for="password">Пароль</label>
            <div>
                <input id="password" type="password" v-model="password" required>
            </div>
            
            <label for="password-confirm">Повторите пароль</label>
            <div>
                <input id="password-confirm" type="password" v-model="password_confirmation" required>
            </div>

            <div>
                <button type="submit">Register</button>
            </div>
        </form>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                username : "",
                email : "",
                password : "",
                password_confirmation : "",
                is_admin : null
            }
        },
        methods: {
            register: function () {
                let data = {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    // is_admin: this.is_admin
                }
                this.$store.dispatch('register', data)
               .then(() => this.$router.push('/login'))
               .catch(err => console.log(err))
            }
        }
    }
</script>
