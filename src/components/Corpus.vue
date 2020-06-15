<template>
    <div>
        <h2>corpus</h2>
        <form @submit.prevent="Search" class="analyse">
            <input type="text" placeholder="Грамматические обозначения" v-model="gr">
            <hr/>
            <input type="text" placeholder="Форма слова" v-model="lex">
            <hr/>
            <input type="text" placeholder="Отрывок текста" v-model="text">
            <hr/>
            <input type="text" placeholder="Автор текста" v-model="username">
            <hr/>
            <input type="number" placeholder="Страница результатов поиска" v-model="page">
            <hr/>
            <button class="button" type="submit">Искать</button>
            <hr/>
                        <textarea v-model="result" placeholder="Результат поиска"></textarea>
        </form>
        <form @submit.prevent="getCorp" class="checkP">
            <button class="button" type="submit">ID</button>
            <input type="text" placeholder="id" v-model="id">
        </form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                gr: '',
                lex: '',
                text: '',
                username: '',
                page: int,
                id: '',
            }
        },
        result: '',
        methods: {
            Search: function () {
                let gr = this.gr;
                let lex = this.lex;
                let text = this.text
                let username = this.username
                let page = this.page
                localStorage.setItem('page', page)
                this.$store.dispatch('searchCorpus',{gr, lex, text, username})
                this.result = localStorage.getItem('searres')
            },
            getCorp: function () {
                let id = this.id
                this.$store.dispatch('getCoprus', id)
                this.result =  localStorage.getItem('corp')
            }
        }
    }
</script>

<style scoped>

</style>