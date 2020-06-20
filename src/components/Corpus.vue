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
        <form @submit.prevent="Seecorp" class="analyse">
            <button class="button" type="submit">Показать результат поиска</button>
            <hr/>
            <textarea v-model="resp" placeholder="Результат поиска"></textarea>
        </form>
        <h1>Поиск всего корпуса</h1>
        <form @submit.prevent="getCorp" class="checkP">
            Введите id корпуса <input type="text" placeholder="id" v-model="id">
            <hr/>
            <button class="button" type="submit"> Искать</button>
            <hr/>
            <h2>Результат поиска</h2>
            <input type="text" placeholder="Автор" v-model="text">
            <hr/>
            <input type="text" placeholder="Название текста" v-model="text">
            <hr/>
            <textarea v-model="result" placeholder="Результат поиска"></textarea>
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
                // result: '',
            }
        },
        resp: '',
        sres: '',
        sresult: '',
        // result: '',
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
            Seecorp: function () {
                let sresult
                // this.result = localStorage.getItem('searres')
                var sres = [
                    {
                        "documentAuthorUsername": "avtor",
                        "documentExcerpt": [
                            {
                                "analysis": {
                                    "gr": "pril",
                                    "lex": "стоять",
                                    "qual": "bastard"
                                },
                                "text": "стоял"
                            }
                        ],
                        "documentID": "15",
                        "documentTitle": "заголовок"
                    }
                ]
                sres.forEach(function (i, item , arr) {
                    if (item.hasOwnProperty('documentAuthorUsername')) {
                        sresult += item['documentAuthorUsername']
                    }
                    alert(sresult)

                })

            },
            getCorp: function () {
                let id = this.id
                this.$store.dispatch('getCoprus', id)
                this.result =  localStorage.getItem('corp')
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