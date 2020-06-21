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
            <textarea v-model="idtext" placeholder="seee"></textarea>
        </form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                sresult: '',
                sres: '',
                idtext: '',
                gr: '',
                lex: '',
                text: '',
                username: '',
            }
        },
        methods: {
            Seecorp: function () {     // /document/search поиск по id, lex, gr...
                let resp
                // let rezultat = ''
                let sresult = ''
                let idtext
                // this.result = localStorage.getItem('searres')
                var sres = [
                    {
                        "documentAuthorUsername": "avtor",
                        "documentExcerpt":
                            [
                                {
                                    "analysis":
                                        {
                                            "gr": "pril",
                                            "lex": "стоять",
                                            // "qual": "bastard"
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
                            if (etem.hasOwnProperty('text')) {
                                sresult += ' текст ' + '"' + etem['text'] + '"'
                            }
                            if (etem.hasOwnProperty('analysis')) {
                                // sresult +=' грамматика ' + etem['analysis'].gr
                                // sresult +=' форма слова ' + etem['lex'].lex
                                sresult += 'analy'+ etem['lex']
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
                this.idtext = sresult
                alert(sresult)
                // console.log(sresult)
                console.log(idtext + 'idtext')
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