<template>
    <div>
    <h3>Аналaйз</h3>
        <form @submit.prevent="Analyse" class="analyse">
            <input type="text" v-model="text" placeholder="vvedi">
            <textarea v-model="text" placeholder="Введите текст для анализа"></textarea>
            {{ jtext }}
            <button type="submit">send</button>
        </form>
        <form @submit.prevent="Parsing" class="Parsing">
            <textarea v-model="atext"></textarea>
            <button type="submit">Parsing</button>
            {{ ptext }}
        </form>
        <form @submit.prevent="See" class="Receive">
            <textarea v-model="atext"></textarea>
<!--            <input type="text" v-model="atext" placeholder="vvedi">-->
            <button type="submit">see</button>
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
                text: "",
                atext: "1",
                jtext: "51351",
                ptext: '',
                jstext: '',
                params:'',

            }
        },
        anat: "hellp",
        message:"hello",
        analtext: '',

        methods: {
            Analyse: function () {
                let text = this.text;
                let doReplaces = this.doReplaces
                let params = doReplaces
                console.log(doReplaces)
                localStorage.setItem('dorep', doReplaces)
                // console.log(text+'текст до отправки в store')
                this.$store.dispatch('analyseText', {text})
                    .then(()=>
                        console.log(doReplaces)
                        // this.anat = localStorage.getItem('antex'),
                        // console.log(anat+'test')
                    )
                    .catch(error => {
                        this.$router.push('/error')
                        console.log(error, 'anerror')
                    })
            },
            Receive: function () {
                var jtext = ''
                 this.jtext = localStorage.getItem('token')
                let atext = JSON.parse(jtext)
                // let atax = JSON.parse(atext)
                // console.log(atax+'errar')
                console.log(atext+'atext')
            },
            Parsing: function () {
                let analtext = ''
                var analysis = ''
                var ptext = [{"analysis":[{"lex":"стол","gr":"S,m,inan=acc,sg"},{"lex":"стол","gr":"S,m,inan=nom,sg"}],"text":"стол"},{"text":"\n"}];
               // var ptext = [{'someKey':'blabla1'},{'someKey':'blabla2'}]
                this.ptext=localStorage.getItem('antext')
                // console.log(ptext)

                this.ptext=ptext.forEach(function (item,i,arr) {
                    analysis += item['text']
                    // item['analysis'].forEach(function (etem,i,arr) {
                    //     analysis+='Разбор'+i+':'+item['analysis']
                    // })
                    // console.log(item['analysis'])
                })
                console.log(analysis)

            },
            See: function () {
                this.atext = localStorage.getItem('antext')
                console.log(atext)
            }
        }
    }
</script>

<style scoped>

</style>