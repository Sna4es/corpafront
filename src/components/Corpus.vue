<template>
    <div>
        <h1>Поиск по известным параметрам</h1>
        <hr/>
        <form @submit.prevent="Search" class="Analyse">
            <input type="text" placeholder="Грамматические обозначения" v-model="gr">
            <hr/>
            <input type="text" placeholder="Форма слова" v-model="lex">
            <hr/>
            <input type="text" placeholder="Отрывок текста" v-model="text">
            <hr/>
            <input type="text" placeholder="Автор текста" v-model="username">
            <hr/>
            Страница результатов поиска
            <input type="number" class="input-page" placeholder=" № " v-model="page">
            <hr/>
            <button class="button" type="submit">Искать</button>
            <hr/>
        </form>
        <form @submit.prevent="Seecorp" class="Analyse">
            <button class="button" type="submit">Посмотреть</button>
            <hr/>
            <textarea v-model="sertext" placeholder="seee"></textarea>
            <hr/>
        </form>
        <h1>Поиск всего корпуса</h1>
        <form @submit.prevent="Getcorp" class="Analyse">
            Введите id корпуса <input type="text" placeholder="id" v-model="id">
            <hr/>
            <button class="button" type="submit"> Искать</button>
            <hr/>
        </form>
        <form @submit.prevent="Seeidcorp" class="analyse">
            <button class="button" type="submit">Посмотреть корпус</button>
            <hr/>
            ID корпуса: {{ idcor }}
            <hr/>
            Название корпуса: <input readonly type="text" v-model="idtitle">
            <hr/>
            Автор корпуса: {{ idauthor }}
            <hr/>
            Тэги: {{ idtags }}
            <hr/>
            <h2>CORPUS</h2>
            <hr/>
            <textarea v-model="idtext" placeholder="Корпус" ></textarea>
        </form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                sresult: '',
                sres: '',
                sertext: '',
                gr: '',
                lex: '',
                text: '',
                page: '',
                username: '',
                id: '',
                idauthor: '',
                idtitle: '',
                corid: '',
                idresult: '',
                idtags: '',
                idcor: '',
                idtext: '',


            }
        },
        methods: {
            Seecorp: function () {     // /document/search поиск по id, lex, gr...
                let resp
                // let rezultat = ''
                let sresult = ''
                let sertext
                // this.result = localStorage.getItem('searres')
                var sres = [
                    {
                        "documentAuthorUsername": "avtor",
                        "documentExcerpt":
                            [
                                {
                                    "analysis":
                                        {
                                            "gr": "S,j,pril",
                                            "lex": "стоять",
                                            "qual": "bastard"
                                        },
                                    "text": "стоял"
                                }
                            ],
                        "documentID": "151",
                        "documentTitle": "заголовок"
                    }
                ]
                sres.forEach(function (item, i, arr) {
                    if (item.hasOwnProperty('documentAuthorUsername')) {
                        sresult += 'Автор корпуса ' + '"' + item['documentAuthorUsername'] + '"'
                    }
                    if (item.hasOwnProperty('documentExcerpt')) {
                        item['documentExcerpt'].forEach(function (etem , j , arq) {
                            if (etem.hasOwnProperty('analysis')) {
                                sresult +=' Разбор: грамматика  '+'"' + etem.analysis.gr + '"'
                                sresult +=' форма слова '+ '"'+ etem.analysis.lex + '"'
                                if (etem.analysis.hasOwnProperty('qual')) {
                                    sresult += ' прочие обозначения ' + '"' + etem.analysis.qual + '"'
                                }
                                // etem['analysis'].forEach(function (ftem, m, ars) {
                                //     sresult +=' грамматика ' + ftem['analysis'].gr
                                //     sresult +=' форма слова ' + ftem['lex']
                                // })
                                // sresult +=' грамматика ' + etem['analysis']
                                // sresult +=' форма слова ' + etem['lex']
                                // sresult += 'analy'+ etem['lex']

                            }
                            if (etem.hasOwnProperty('text')) {
                                sresult += ' текст ' + '"' + etem['text'] + '"'
                            }
                            // if (etem.hasOwnProperty('Analysis')) {

                            //         etem['Analysis'].forEach(function (dtem , k , arrr) {
                            //             sresult += dtem['lex']
                            //             sresult += dtem['gr']
                            //             if (dtem.hasOwnProperty('qual')) {
                            //                 sresult += 'прочие обозначения '+ dtem['qual']
                            //             }
                            //         })
                            //     }
                        })
                    }
                    if (item.hasOwnProperty('documentID')) {
                        sresult +=' id корпуса ' + '"' + item['documentID'] + '"'
                    }
                    if (item.hasOwnProperty('documentTitle')) {
                        sresult +=' название документа ' + '"' + item['documentTitle'] + '"'
                    }
                })
                this.sertext = sresult
                alert(sresult)
                // console.log(sresult)
                console.log(sertext + 'sertext')
            },
            Search: function () {
                let gr = this.gr;
                let lex = this.lex;
                let text = this.text
                let username = this.username
                let page = this.page
                localStorage.setItem('page', page)
                this.$store.dispatch('searchCorpus',{gr, lex, text, username})
                    .then(()=> alert('Поиск успешно произведён')
                    )
                    .catch(error => {
                        console.log(error)
                        alert(error)
                    })
            },
            Getcorp: function () {
                let id = this.id
                this.$store.dispatch('getCoprus', id)
            },
            Seeidcorp: function () {
                let idauthor
                let idtitle
                let idresult = ''
                let corid = {
                    "title":"тестовый тайтле",
                    "authorID":"5eebaee1a9c6d0237712b93c",
                    "creationDate":{
                        "year":2020,
                        "dayOfMonth":21,
                        "dayOfWeek":7,
                        "dayOfYear":173,
                        "era":1,
                        "yearOfEra":2020,
                        "yearOfCentury":20,
                        "monthOfYear":6,
                        "centuryOfEra":20,
                        "weekOfWeekyear":25,
                        "weekyear":2020,
                        "minuteOfHour":25,
                        "hourOfDay":21,
                        "millisOfSecond":555,
                        "secondOfMinute":19,
                        "secondOfDay":77119,
                        "millisOfDay":77119555,
                        "minuteOfDay":1285,
                        "chronology":{
                            "zone":{
                                "fixed":false,
                                "uncachedZone":{
                                    "fixed":false,
                                    "cachable":true,
                                    "id":"Europe/Astrakhan"
                                },
                                "id":"Europe/Astrakhan"
                            }
                        },
                        "zone":{
                            "fixed":false,
                            "uncachedZone":{
                                "fixed":false,
                                "cachable":true,
                                "id":"Europe/Astrakhan"
                            },
                            "id":"Europe/Astrakhan"
                        },
                        "millis":1592760319555,
                        "afterNow":false,
                        "beforeNow":true,
                        "equalNow":false
                    },
                    "words":[
                        {
                            "analysis":{
                                "lex":"йод",
                                "gr":"ы",
                                "qual":"bastard"
                            },
                            "text":"йода"
                        },
                        {
                            "analysis":{
                                "lex":"стоять",
                                "gr":"V,ipf,intr=praet,sg,indic,m",
                                "qual":"abort"
                            },
                            "text":"стоял"
                        }
                        ],
                    "tags":[
                        "тестовый тэг"
                    ],
                    "authorUsername":"Alex2",
                    "_id":"owhrlishfgoiawhefwahto3"
                }

                this.idtitle = corid.title
                this.idauthor = corid.authorUsername
                this.idtags = corid.tags
                this.idcor = corid._id
                corid.words.forEach(function (mtem, m , mrr) {
                    if (mtem.hasOwnProperty('analysis')){
                        idresult +=' Разбор: грамматика  '+'"' + mtem.analysis.gr + '"'
                        idresult +=' форма слова '+ '"'+ mtem.analysis.lex + '"'
                        if (mtem.analysis.hasOwnProperty('qual')) {
                            idresult +=' прочие обозначения ' + '"' +mtem.analysis.qual + '"'
                        }
                    }
                    if (mtem.hasOwnProperty('text')) {
                        idresult +=' текст ' + '"' + mtem['text'] + '"'
                    }
                })
                this.idtext = idresult
                console.log(idtitle+' '+idauthor)
                alert(idresult)
            }

        }
    }
</script>

<style scoped>
    .input-page {
        width: 33px;
        padding: 5px  ;
        margin-left: auto;
        margin-right: auto;
    }
</style>