<template>
 <div>
   <form class="login" @submit.prevent="login">
     <h1>Войдите</h1>
     <label>Имя пользователя</label>
     <input required v-model="username" type="text" placeholder="Имя пользователя"/>
     <label>Пароль</label>
     <input required v-model="password" type="password" placeholder="Пароль"/>
     <hr/>
     <button type="submit">Войти</button>
   </form>
 </div>
</template>
<script>
	export default {
		data(){
			return {
				username : "",
            	password : ""
            }
		},
		methods: {
		 	login: function () {
		   		let username = this.username
		   		let password = this.password
		   		this.$store.dispatch('login', { username, password })
		   		.then(() => this.$router.push('/home'))
		   		.catch(err => console.log(err))
		   	}
		}
	}
</script>