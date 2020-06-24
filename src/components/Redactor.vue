<template>
    <div>
        <h3>Редактор</h3>
        <form @submit.prevent="Receive" class="analyse">
            <button class="button" type="submit">Запросить</button>
            <hr/>
            <textarea v-model="wordlist" placeholder="Нажмите кнопку Запросить"></textarea>
        </form>
        <hr/>
        <form @submit.prevent="Send" class="analyse">
            <input type="text" placeholder="Введите название текста" v-model="title">
            <hr/>
            <input type="text" placeholder="Введите тэги для текста" v-model="tags">
            <hr/>
            <button class="button" type="submit">Сохранить</button>
<!--            <textarea v-model="wordlist" placeholder="Нажмите кнопку Запросить"></textarea>-->
        </form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                wordlist: '',
                title: '',
                tags:'',
                tags2:'',
                words: '',
                ptext: '',
                analtext: '',
                watext: '',
                wbtext: '',
                wctext: '',
                wdtext: '',
                wetext: '',
                wftext: '',
                wgtext: '',
                wtext1: '',
                wtext2: '',
                wtext3: '',
                wtext4: '',
                wtext5: '',
                wtext6: '',
                wtext7: '',

            }
        },


        methods: {
            // Receive: function () {    // временно не трогать
            //     this.wordlist = localStorage.getItem('razbor')
            // },
            Receive: function () {
                let analtext = ''
                let ptext = JSON.parse(localStorage.getItem('wlist'))
                ptext.forEach(function (item, i, arr) {
                    if (item.hasOwnProperty('analysis')) {
                        item['analysis'].forEach(function (etem,j,arrr) {
                                analtext +=' Разбор: форма слова '+ '"'+ etem['lex']+'"'
                            analtext +=' грамматика '+'"' + etem['gr']+'" '
                            if (etem.hasOwnProperty('qual')) {
                                analtext +=' прочие обозначения '+ '"' + etem['qual']+'"'}
                        })
                    }
                    {if (item.hasOwnProperty('text')) {
                        analtext +=' текст '+'"' + item['text'] + ' "'
                    }}

                })
                // console.log(ptext)
                console.log(analtext)
                localStorage.setItem('razbor2', analtext) // для отладки
                this.wordlist = analtext
                alert(analtext)
                console.log(ptext)
            },
            Send: function () {
                let title = this.title;
                let wordlist = this.wordlist
                // let tags2 = this.tags2
                let tags = JSON.stringify([this.tags])
                let watext=wordlist.replace(/Форма слова/gi,'"lex" :')
                let wbtext=watext.replace(/Разбор:/gi, '{"Analysis" : {')
                let wctext=wbtext.replace(/грамматика/gi, ',"gr" :')
                let wdtext=wctext.replace(/текст/gi, ', "text" :')
                let wetext=wdtext.replace(/прочие обозначения/gi, '"qual" :')
                let wftext=wetext.replace(/" {/gi, '" } , { ')
                let wgtext=wftext.replace(/  /gi, ' }')
                let words3 ='[' + wgtext + '}]'
                let words = JSON.parse(words3)
                console.log(tags)
                // let words = [ {"Analysis" : { "lex" : "стол" ,"gr" : "S,m,inan=nom,sg" }, "text" : "стол "}]
                // console.log(words)
                // let words = [
                //     {
                //         "analysis": {
                //             "gr": "string",
                //             "lex": "string",
                //             "qual": "string"
                //         },
                //         "text": "string"
                //     }
                // ]

                this.$store.dispatch('saveAnalyse', {title , tags, words})
            }
        },


    }


</script>

<style scoped>

</style>