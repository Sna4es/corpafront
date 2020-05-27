<template>
    <div>
    <h3>Аналaйз</h3>
        <form @submit.prevent="Analyse" class="analyse">
            <input type="text" v-model="text" placeholder="vvedi">
            <button type="submit">send</button>
        </form>
        <select v-model="doReplaces" >
            <option v-for="choice in choices" v-bind:value="choice.option">{{ choice.option }}</option>
        </select>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                choices: [
                    {option: 'true'},
                    {option: 'false'}
                ],
                doReplaces: '',
                text: '',
            }
        },
        methods: {
            Analyse: function () {
                let text = this.text;
                let doReplaces = this.doReplaces
                this.$store.dispatch('analyseText', {text, doReplaces})
                    .catch(error => {
                        this.$router.push('/error')
                        console.log(error, 'anerror')
                    })
            },
        }
    }
</script>

<style scoped>

</style>