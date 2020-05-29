<template>
    <div>
        <h6>произошла ошибка, обратитесь к разрабу</h6>
        <form @submit.prevent="Back" class="analyse">
            <button type="submit">Назад</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Error400" ,
        methods: {
            Back: function () {
                this.$router.push('/register')

            }
        }
    }
</script>

<style scoped>

</style>