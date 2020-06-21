<template>
    <div>
        <h1>Поиск по известным параметрам</h1>
        <form @submit.prevent="Search" class="analyse">
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
        </form>
        <hr/>
        <form @submit.prevent="getMyCorp" class="analyse">
            <button class="button" type="submit">Найти свои корпусы</button>
        </form>
        <hr/>
        <form @submit.prevent="Seecorp" class="analyse">
            <button class="button" type="submit">Показать результат поиска</button>
            <hr/>
            <textarea v-model="idtext" placeholder="ыыыыы"></textarea>
            {{ rezultat }}
        </form>
        <h1>Поиск всего корпуса</h1>
        <form @submit.prevent="getCorp" class="checkP">
            Введите id корпуса <input type="text" placeholder="id" v-model="id">
            <hr/>
            <button class="button" type="submit"> Искать</button>
            <hr/>
            <h2>Результат поиска</h2>
            <input type="text" placeholder="Автор" v-model="idauthor">
            <hr/>
            <input type="text" placeholder="Название текста" v-model="idtitle">
            <hr/>
            <textarea v-model="text" placeholder="Результат поиска"></textarea>
            <hr/>
        </form>
        <form @submit.prevent="seeCorpID" class="analyse">
            <button class="button" type="submit">Получить корпус по ID</button>
            <hr/>
        </form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                gr: null,
                lex: '',
                text: '',
                username: '',
                page: int,
                id: '',
                resp: '',
                idauthor: '',
                idtitle: '',
                sresult: '',
                rezultat: '',
                idtext: '',
            }
        },

        methods: {
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
            Seecorp: function () {     // /document/search поиск по id, lex, gr...
                let resp
                // let rezultat = ''
                let sresult = ''
                let srez
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
                console.log(idtext)
            },
            getCorp: function () {
                let id = this.id
                this.$store.dispatch('getCoprus', id)
                this.result =  localStorage.getItem('corp')
            },
            seeCorpID: function () {
              let gresult = ''
              let idauthor = ''
              let idtitle = ''
              let corid = [{
                  "authorID": "string",
                  "creationDate": "2020-06-21T15:00:16.089Z",
                  "id": "string",
                  "tags": [
                      "залёный", "красный"
                  ],
                  "title": "string",
                  "words": [
                      {
                          "analysis": {
                              "gr": "string",
                              "lex": "string",
                              "qual": "string"
                          },
                          "text": "string"
                      }
                  ]
              }]
              corid.forEach( function (qtem, a, brr) {
                  if (qtem.hasOwnProperty('authorID')) {
                      gresult += ' ID автора ' + qtem['authorID']
                  }
                  if (qtem.hasOwnProperty('tags')) {
                      gresult += ' tagi ' + qtem['tags']
                  }

              })
                alert(idtitle)
                this.idtitle = gresult

            },
            getMyCorp: function () {
                this.$store.dispatch('getMyCorpus')
            },
            Seegcorp: function () {

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