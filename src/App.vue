<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home | </router-link>
      <router-link v-if="isLoggedOut" to="/login">Вход | </router-link>
      <router-link v-if="isLoggedOut" to="/register">Регистрация | </router-link>
      <router-link v-if="isLoggedIn" to="/profile">Профиль пользователя | </router-link>
      <router-link to="/about">About | </router-link>
      <router-link v-if="isLoggedIn" to="/analyse">Анализ | </router-link>
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
             //this.$store.dispatch(logout)
          }
          // else if (error.status === )
          throw error;
          console.log('intercept')
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
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
