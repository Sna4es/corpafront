<template>
  <div class="home">
    <textarea class="home">Работа направлена на создание лингвистического корпуса деловых документов XVIII – XIX вв.,
      созданных в канцеляриях Войска Донского и хранящихся в фонде «Михайловский станичный атаман» Государственного архива Волгоградской области. </textarea>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
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
    height: 200px;
    padding: 12px 20px;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    outline:none;
    font-size: 20px;
  }
</style>
