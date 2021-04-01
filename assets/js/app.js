// Задание: Создать таблицу с результатами стрельбы в биатлонной гонке.
// Данные: при загрузке страницы сгенерировать правдоподобные данные.
// Детали:
// Изначально таблица отсортирована согласно финальным местам в гонке
// Дополнительно должна быть возможность отсортировать по: имени, попаданиям, скорострельности
// Поиск по имени

const URL = 'https://restcountries.eu/rest/v2/all';

//functions
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Vue.createApp({
    data() {
        return {
            place: 1,
            athletes: [],
            name: '',
            countries: [],
            search: '',
            sort: 'none',
            athleteSort: 'none',
            shootingSort: 'none',
        }
    },
    computed: {
        athleteList() {

            let res = this.athletes.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()));

            //load sort
            res.sort((a, b) => a.time - b.time);
            for (let i = 0; i < res.length; i++) {
                res[i].place = i + 1;
            }
            
            // time sort
            if (this.sort !== 'none') { 

                if (this.sort) {

                    res.sort((a, b) => a.time - b.time);
                    for (let i = 0; i < res.length; i++) {
                        res[i].place = i + 1;
                    }
                } else {
                    if(this.place = 61){
                        this.place = 1;
                    }
                    res.sort((a, b) => b.time - a.time);
                    for (let i = res.length - 1; i >= 0; i--) {
                        res[i].place = this.place;
                        this.place++;
                    }
                }

            }

            //athlete sort
            if (this.athleteSort !== 'none') {
                
                if (this.athleteSort) {
                    res.sort((a, b) => a.name > b.name ? 1 : -1);
                } else {
                    res.sort((a, b) => a.name > b.name ? -1 : 1);
                }
            } 

            //shooting sort
            if (this.shootingSort !== 'none') { 

                if (this.shootingSort) {
                    res.sort((a, b) => a.shooting - b.shooting);
                } else {
                    res.sort((a, b) => b.shooting - a.shooting);
                }

            }

            return res;
        }
    },
    async mounted() {

        let info = await fetch(URL);
        info = await info.json();
        this.countries = info;

        for (let i = 0; i < 60; i++) {

            let athlete = {};

            athlete.name = `${faker.name.firstName(0)} ${faker.name.lastName()}`;

            let index = getRandomIntInclusive(0, info.length);
            if(info[index] === undefined) continue;
            athlete.country = info[index].name;
            athlete.flag = info[index].flag;

            athlete.shooting = getRandomIntInclusive(0, 10);

            const maxSecond = 40;
            const minSecond = 20;
            const maxMillisecond = 9;
            const minMillisecond = 0;
            athlete.time = getRandomIntInclusive(minSecond, maxSecond) + (getRandomIntInclusive(minMillisecond, maxMillisecond) / 10);

            this.athletes.push(athlete);

        }

    }
}).mount('#app');
