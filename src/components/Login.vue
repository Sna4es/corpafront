<template>
 <div>
   <form class="login" @submit.prevent="login">
     <h2>Введите имя пользователя и пароль</h2>
     <input required v-model="username" type="text" placeholder="Имя пользователя"/>
     <hr/>
     <input required v-model="password" type="password" placeholder="Пароль"/>
     <hr/>
     <button class="button" type="submit">Войти</button>
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

<style scoped>
  /*.button {*/
  /*  background-color: #4CAF50; !* Green *!*/
  /*  border: none;*/
  /*  color: white;*/
  /*  padding: 10px 24px;*/
  /*  text-align: center;*/
  /*  text-decoration: none;*/
  /*  display: inline-block;*/
  /*  font-size: 21px;*/
  /*  border-radius: 12px;*/
  /*}*/
  /*input[type=text]:focus {*/
  /*  border: 22px red;*/
  /*  border-radius: 6px;*/
  /*}*/
  /*input[type=password]:focus {*/
  /*  border: 22px red;*/
  /*  border-radius: 6px;*/
  /*}*/
  /*hr {*/
  /*  border: white;*/
  /*  color: white;*/
  /*}*/

</style>