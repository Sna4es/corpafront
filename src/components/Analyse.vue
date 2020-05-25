<template>
    <div>
    <h3>Аналaйз</h3>
        <form @submit.prevent="Analyse" class="analyse">
            <input type="text" v-model="anText" placeholder="vvedi">
            <button type="submit">send</button>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                anText: '',
            }
        },
        methods: {
            Analyse: function () {
                let anText = this.anText;
                this.$store.dispatch('analyseText')
                    .catch(error => {
                        this.$router.push('/error')
                        console.log(error)
                    })
            },
        }
    }
</script>

<style scoped>

</style>