<template>
    <div>
        <h6>Неправильно введён старый пароль. ПОпробуйте ещё раз</h6>
        <form @submit.prevent="Back" class="analyse">
            <button type="submit">Назад</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "ErrorCurrentPass" ,
        methods: {
            Back: function () {
                this.$router.push('/profile')

            }
        }
    }
</script>

<style scoped>

</style>