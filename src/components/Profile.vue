

<template>
    <div>
        <form class="checkP" @submit.prevent="checkProfile">
            <button type="submit">check profile</button>

        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                newUsername: ''

            }
        },
        methods: {
            checkProfile: function () {
                this.$store.dispatch("profileMe" )

            },
            userRename: function () {


            }
        }

    }
</script>

<style scoped>

</style>