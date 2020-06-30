<template>
  <div class="home2">
    <textarea class="home">Работа направлена на создание лингвистического корпуса деловых документов XVIII – XIX вв.,
      созданных в канцеляриях Войска Донского и хранящихся в фонде «Михайловский станичный атаман» Государственного архива Волгоградской области. </textarea>
    <hr/>
    <form @submit="goAnalyse" class="Analyse">
      <button type="submit" class="button" name="knopka">Перейти к анализу</button>
      <router-link v-if="isLoggedIn" to="/redactor">Редактор | </router-link>
      <router-link
              to="/analyse"
              v-slot="{ href, route, navigate, isActive, isExactActive }"
      >
        <NavLink :active="isActive" :href="href" @click="navigate">
          <u>Перейти к аназизу</u>
        </NavLink>
      </router-link>
    </form> // попытка как то разнообразить главную, вообще сюда бы статистику какую-нить, но эт надо и бэк
    доработать...
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {
    goAnalyse: function () {
      this.$router.push('/analyse')
    } // перейти на страницу анализа
  }
}
</script>

<style scoped>
  .home {
    background: #f6f6f6;
    border: none;
    padding: 8px 0 8px 10px;
    resize: both;
    overflow: auto;
    width: 75%;
    height: 100px;
    padding: 12px 20px;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    outline:none;
    font-size: 20px;
  }
</style>
