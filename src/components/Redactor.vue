<template>
    <div>
        <h3>Редактор</h3>
        <form @submit.prevent="Receive" class="analyse">
            <button class="button" type="submit">Запросить</button>
            <hr/>
            <textarea v-model="wordlist" placeholder="Нажмите кнопку Запросить"></textarea>
        </form>
        <form @submit.prevent="Send" class="analyse">
            <input type="text" placeholder="Введите название текста" v-model="title">
            <hr/>
            <button class="button" type="submit">Сохранить</button>
<!--            <textarea v-model="wordlist" placeholder="Нажмите кнопку Запросить"></textarea>-->
        </form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                wordlist: '',
            }
        },

        title: '',

        methods: {
            Receive: function () {
                this.wordlist = localStorage.getItem('wlist')
            },
            Send: function () {
                let title = this.title;
                let wordlist = this.wordlist
                this.$store.dispatch('saveAnalyse', {title, wordlist})
            }
        },


    }


</script>

<style scoped>

</style>