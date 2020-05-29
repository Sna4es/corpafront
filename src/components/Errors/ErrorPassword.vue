<template>
    <div>
        <h6>Имя занято</h6>
        <form @submit.prevent="Back" class="analyse">
            <button type="submit">Назад</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "ErrorPassword",
        methods: {
            Back: function () {
                this.$router.push('/register')

            }
        }
    }
</script>

<style scoped>

</style>