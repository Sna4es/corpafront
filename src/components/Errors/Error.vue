<template>
    <div>
    <h4>Ошибка, нажмите кнопку "Назад"</h4>
    <form @submit.prevent="Back" class="Analyse">
        <button class="button" type="submit">Назад</button>
        <hr/>
    </form>
        </div>
</template>

<script>
    export default {
        data () {
            return {


            }
        },
        methods: {
            Back: function () {
                this.$router.back()
            }
        }
    }
</script>

<style scoped>

</style>