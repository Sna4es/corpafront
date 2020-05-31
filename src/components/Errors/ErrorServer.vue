<template>
    <div>
        <h6>Ошибка. Сервер недоступен</h6>
        <form @submit.prevent="Back" class="analyse">
            <button type="submit">Назад</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "ErrorServer",
        methods: {
            Back: function () {
                // this.$router.push('/register')
                this.$router.back()

            }
        }
    }
</script>

<style scoped>

</style>