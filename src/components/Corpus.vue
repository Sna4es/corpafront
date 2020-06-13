<template>
    <div>
        <h2>corpus</h2>
        <form @submit.prevent="Send" class="analyse">
            <button type="submit">Искать</button>
            <input type="text" placeholder="gr" v-model="gr">
            <input type="text" placeholder="lex" v-model="lex">
            <input type="text" placeholder="text" v-model="text">
            <input type="text" placeholder="username" v-model="username">
            <input type="number" placeholder="Страница" v-model="username">
                        <textarea v-model="result" placeholder="Result"></textarea>
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
            }
        },
        result: '',
        methods: {
            Search: function () {
                let gr = this.gr;
                let lex = this.lex;
                let text = this.text
                let username = this.username
                this.$store.dispatch('searchCorpus',{gr, lex, text, username})
                this.result = localStorage.getItem('searres')
            }
        }
    }
</script>

<style scoped>

</style>