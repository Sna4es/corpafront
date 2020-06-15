<template>
    <div>
    <h3>Аналaйз</h3>
        <form @submit.prevent="Analyse" class="analyse">
            <textarea v-model="text" placeholder="Введите текст для анализа"></textarea>
            <hr/>
            Замена символов <select v-model="doReplaces">
                <option v-for="choice in choices" v-bind:value="choice.option"> {{ choice.text }}</option>
            </select>
            <hr/>
            <button class="button" type="submit">Отправить</button>
        </form>
        <hr/>
        <form @submit.prevent="Parsing" class="Parsing">
            <textarea v-model="atext"></textarea>
            <hr/>
            <textarea v-model="analtext"></textarea>
            <button type="submit">Parsing</button>
<!--            {{ ptext }}-->
            {{ analtext }}
        </form>
        <hr/>
        <form @submit.prevent="Receive" class="Receive">
            <textarea v-model="jtext"></textarea>
<!--            <input type="text" v-model="atext" placeholder="vvedi">-->
            <button type="submit">receive</button>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                choices: [
                    {text: 'Включена', option: 'true'},
                    {text: 'Выключена',option: 'false'}
                ],
                doReplaces: '',
                text: "",
                atext: "1",
                jtext: "51351",
                ptext: '',
                jstext: '',
                params:'',
                analtext: '',

            }
        },
        anat: "hellp",
        message:"hello",
        analysis: '',

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
                        // this.text = localStorage.getItem('antex'),
                        // console.log(anat+'test')
                    )
                    .catch(error => {
                        this.$router.push('/error')
                        console.log(error, 'anerror')
                    })
            },
            Receive: function () {
                var jtext = ''
                 this.jtext = localStorage.getItem('antext')
                let atext = JSON.parse(jtext)
                // let atax = JSON.parse(atext)
                // console.log(atax+'errar')
                console.log(atext+'atext')
            },
            Parsing: function () {
                let analtext = '3'
                var analysis = ''
                // var ptext = ''
                var ptext=[{"analysis":[{"lex":"стол","gr":"S,m,inan=acc,sg"},{"lex":"стол","gr":"S,m,inan=nom,sg"}],"text":"стог"}]
               // var ptext = [{"someKey":"blabla1"},{"key2":"blabla2"}]
               //  this.ptext=localStorage.getItem('antext')
                // console.log(ptext)
                //
                this.ptext=ptext.forEach(function (item,i,arr) {
                    item['analysis'].forEach(function (etem,j,arrr) {
                        analtext +=' Разбор: форма слова '+ '"'+ etem['lex']+'"'
                        analtext +='  грамматика  '+'"' + etem['gr']+'"'
                    })

                //     analtext +='text'+ ptext.text
                //     // item['text'].forEach(function (etim,k,arrrr) {
                //     //     analtext +=' ориг слово '+etim['text']
                //     // })
                //
                //
                //    // analtext += arr['analysis']
                    localStorage.setItem('analtext', analtext)
                })
                //  var ptext2=JSON.parse(ptext)
                // var ptext3=ptext2.someKey

                console.log(ptext)

                // console.log(analysis)

                // this.ptext=ptext.forEach(function (item,i,arr) {
                //         if (item.hasOwnProperty('analysis')) {
                //             item['analysis'].forEach(function (etem,i,arr) {
                //                 analysis+='Разбор'+i+':'+item['analysis']
                //             })
                //             // analysis += item['analysis']
                //         } else {
                //             analysis += item['text']
                //         }

            },
            // See: function () {
            //     // this.atext = localStorage.getItem('antext')
            //     this.analtext = localStorage.getItem('analy')
            //     console.log(analtext)
            // }
        }
    }
</script>

<style scoped>
    textarea {
        width: 25%;
        height: 120px;
        padding: 12px 20px;
        box-sizing: border-box;
        border: 2px solid #ccc;
        border-radius: 12px;
        background-color: #f8f8f8;
        resize: both;
        overflow: auto;
    }


</style>