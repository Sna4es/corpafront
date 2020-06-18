<template>
    <div>
        <h3>Редактор</h3>
        <form @submit.prevent="Receive" class="analyse">
            <button class="button" type="submit">Запросить</button>
            <hr/>
            <textarea v-model="words" placeholder="Нажмите кнопку Запросить"></textarea>
        </form>
        <hr/>
        <form @submit.prevent="Send" class="analyse">
            <input type="text" placeholder="Введите название текста" v-model="title">
            <hr/>
            <input type="text" placeholder="Введите тэги для текста" v-model="tags">
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
                words: '',
            }
        },

        title: '',
        tags:'',

        methods: {
            Receive: function () {
                this.words = localStorage.getItem('wlist')
            },
            Send: function () {
                let title = this.title;
                let words = this.words
                let tags = this.tags
                this.$store.dispatch('saveAnalyse', {title , tags , words})
            }
        },


    }


</script>

<style scoped>

</style>