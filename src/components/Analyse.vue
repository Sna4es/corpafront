<template>
    <div>
        <h2>Страница анализа текста</h2>
        <form @submit.prevent="Analyse" class="analyse">
            <textarea v-model="text" placeholder="Введите текст для анализа"></textarea>
            <hr/>
            Замена символов <select v-model="doReplaces">
            <hr/>
            <option v-for="choice in choices" v-bind:value="choice.option"> {{ choice.text }}</option>
        </select>
            <hr/>
            <button class="button" type="submit">Отправить</button>
        </form>
        <hr/>
<!--        <form @submit.prevent="seeAnalyse" class="seeAnalyse">-->
<!--        <button class="button" type="submit">Просмотреть результат</button>-->
<!--        </form>-->
<!--        <hr/>-->
        <form @submit.prevent="Parsing" class="Parsing">
<!--            <textarea v-model="text"></textarea>-->
<!--            <hr/>-->
            <button class="button" type="submit">Посмотреть результат</button>
            <!--            {{ ptext }}-->
            {{ analtext }}
        </form>
        <hr/>
<!--        <form @submit.prevent="Receive" class="Receive">-->
<!--            <textarea v-model="analtext"></textarea>-->
<!--            &lt;!&ndash;            <input type="text" v-model="atext" placeholder="vvedi">&ndash;&gt;-->
<!--            <button type="submit">receive</button>-->
<!--        </form>-->
<!--        <form @submit.prevent="Replace" class="Receive">-->

<!--            <button type="submit">replace</button>-->
<!--        </form>-->
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
                qqtext:'',
                qwtext: '',
                qatext:'',
                qbtext: '',
                qctext: '',
                qdtext: '',
                ptext: '',
                qptext: '',
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
                if (text != "") {
                    let text = ''
                }
                let analtext = ''
                let text2 = this.text.replace(/\n/gi,' ');
                let text = text2
                let doReplaces = this.doReplaces
                let params = doReplaces
                console.log(doReplaces)
                localStorage.setItem('dorep', doReplaces)
                // console.log(text+'текст до отправки в store')
                this.$store.dispatch('analyseText', {text})
                    .then(()=>
                            console.log(doReplaces),
                        // alert ('Текст успешно обработан. Нажмите кнопку "Просмотреть результат'),
                        // this.text = localStorage.getItem('antext'),
                        console.log(text)
                        // console.log(anat+'test')
                    )
                    .catch(error => {
                        // this.$router.push('/error')
                        console.log(error, 'anerror')
                    })
            },
            Receive: function () {
                let jtext = localStorage.getItem('analtext')

            },
            Replace: function () {
                let qqtext = localStorage.getItem('antext')
                let qqext = qqtext.replace(/Форма слова/gi,',"lex" :')
                let qwtext = qqext.replace(/Разбор:/gi, '"[{"Analysis" : {')
                let qatext =  qwtext.replace(/грамматика/gi, '"gr" :')
                let qbtext = qatext.replace(/текст/gi, '}, "text" :')
                let qctext = qbtext.replace(/прочие обозначения/gi, '"qual" :')
                // let qdtext = qctext.replace(//)
                alert(qctext)
                this.text = qctext
            },
            Parsing: function () {
                let analtext = ''
                let ptext = JSON.parse(localStorage.getItem('wlist'))
                if (ptext != null) {
                    ptext.forEach(function (item, i, arr) {
                        if (item.hasOwnProperty('analysis')) {
                            item['analysis'].forEach(function (etem,j,arrr) {
                                analtext +=' Разбор: форма слова '+ '"'+ etem['lex']+'"'
                                analtext +=' грамматика '+'"' + etem['gr']+'" '
                                if (etem.hasOwnProperty('qual')) {
                                    analtext +='прочие обозначения '+ '"' + etem['qual']+'"'}
                                analtext += ' слово ' + '"' + item['text'] + '"'
                            })
                        }
                        // {if (item.hasOwnProperty('text')) {
                        //     analtext +=' текст '+'"' + ptext.text + '"'
                        // }}
                        {if (/\n/gi.test(item['text'])) {
                            analtext += ' sym ' + '" "'
                        }
                        }
                        {if (/[\d\t\v\f\r-.?!)(,:]/gi.test(item['text'])) {
                            analtext += ' sym ' + '"' + item['text'] + '"'
                        }
                        }

                    })} else {alert('Сначала проведите анализ')}
                // ptext.forEach(function (item, i, arr) {
                //     if (item.hasOwnProperty('analysis')) {
                //         item['analysis'].forEach(function (etem,j,arrr) {
                //         analtext +=' Разбор: форма слова '+ '"'+ etem['lex']+'"'
                //         analtext +='  грамматика  '+'"' + etem['gr']+'" '
                //         if (etem.hasOwnProperty('qual')) {
                //         analtext +=' прочие обозначения '+ '"' + etem['qual']+'"'}
                //         })
                //     }
                //     {if (item.hasOwnProperty('text')) {
                //         analtext +=' текст '+'"' + item['text'] + '"'
                //     }}
                //
                // })
                // console.log(ptext)
                console.log(analtext)
                localStorage.setItem('razbor', analtext)
                this.text = analtext
                // alert(analtext)
            },

        }
    }
</script>

<style scoped>
    /*textarea {*/
    /*    width: 25%;*/
    /*    height: 120px;*/
    /*    padding: 12px 20px;*/
    /*    box-sizing: border-box;*/
    /*    border: 2px solid #ccc;*/
    /*    border-radius: 12px;*/
    /*    background-color: #f8f8f8;*/
    /*    resize: both;*/
    /*    overflow: auto;*/
    /*}*/
select {
    /*display: block;*/
    font-size: 14px;
    font-family: sans-serif;
    font-weight: 700;
    color: #444;
    line-height: 1.3;
    padding: .6em 1.4em .5em .8em; width: 100%;
    max-width: 20%;
    box-sizing: border-box;
    margin: 0;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
    border-radius: .5em;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'), linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
    background-repeat: no-repeat, repeat;
    background-position: right .7em top 50%, 0 0;
    background-size: .65em auto, 100%;
    margin-left: auto;
    margin-right: auto;
}


</style>