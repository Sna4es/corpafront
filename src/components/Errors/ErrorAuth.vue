<template>
    <div>
        <h1>Иоишбка, перезайдите</h1>
        <form @submit.prevent="Back" class="analyse">
            <button type="submit">Назад</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "ErrorAuth",
        methods: {
            Back: function () {
                this.$router.push('/login')

            }
        }
    }
</script>

<style scoped>

</style>