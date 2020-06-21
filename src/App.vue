<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="isLoggedIn" to="/home">Главная | </router-link>
      <router-link v-if="isLoggedOut" to="/login">Вход | </router-link>
      <router-link v-if="isLoggedOut" to="/register">Регистрация | </router-link>
      <router-link v-if="isLoggedIn" to="/profile">Профиль пользователя | </router-link>
      <router-link v-if="isLoggedOut" to="/about">О Ресурсе </router-link>
      <router-link v-if="isLoggedIn" to="/analyse">Анализ | </router-link>
      <router-link v-if="isLoggedIn" to="/redactor">Редактор | </router-link>
      <router-link v-if="isLoggedIn" to="/corpus">Корпус | </router-link>
      <span v-if="isLoggedIn"><a @click="logout">Выход</a></span>
    </div>
    <router-view/>
  </div>
</template>
<script>
  export default {
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
      isLoggedOut : function () { return !this.$store.getters.isLoggedIn}
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    },
    created: function () {
      this.$http.interceptors.response.use(undefined, function (error) {
        return new Promise(function (resolve, reject) {
          if (error.status === 401 && error.config && !err.config.__isRetryRequest) {
             this.$store.dispatch('logout')

          }
          // else if (error.status === )
          throw error;
          console.log('intercept')
          console.log('errorapp='+ error)
        });
      });
    },

  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  cursor: pointer;
}

#nav a:hover {
  text-decoration: underline;
  text-decoration-color: white;
}

#nav a.router-link-exact-active {
  color: #4CAF50;
}

input {
  width: 200px;
  font-size: 13px;
  padding: 6px 0 4px 10px;
  border: 2px solid #4CAF50;
  background: #F6F6f6;
  border-radius: 12px;
}
input:focus {
  width: 200px;
  font-size: 13px;
  padding: 6px 0 4px 10px;
  border: 2px solid #00ace6;
  background: #F6F6f6;
  border-radius: 6px;
  outline:none;
}

hr {
  border: white;
  color: white;
}
.button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 19px;
  border-radius: 12px;
  outline:none;
}
  textarea {
    background: #f6f6f6;
    border: 3px solid #4CAF50;
    border-radius: 12px;
    padding: 8px 0 8px 10px;
    resize: both;
    overflow: auto;
    width: 75%;
    height: 150px;
    padding: 12px 20px;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    outline:none;
  }
  textarea:focus {
    border: 2px solid #00ace6;
    border-radius: 1px;
  }

</style>
