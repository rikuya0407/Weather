class Weather {
    constructor(){
        this.submit = document.querySelector('.submit');
        this.cityNum = document.querySelector('.city-num');
        this.citys = document.querySelectorAll('option');
        this.weatherWord = document.querySelector('.weather-word');
        this.date = document.querySelector('.date');
        this.submit.addEventListener('click',this._submitDate.bind(this));
    }

    // 一番最初にデータが送られてきて処理をするメソッド
    _submitDate(){
        this.date.innerHTML = '';
        // 都市の名前を繰り返し処理をおこなう
        this.citys.forEach(city =>{
            // 振り分けられた番号が一致したら都市の名前が決定する
            if(city.value == this.cityNum.value){
                cityName = city.textContent;
            }
        });
        this._screen();
        this._Api();
    }

    /*
    screenクラスは
    東京のの明日からの天気はこちらです。
    のように出力させます
    注:cityNameは変数
    */
    _screen(){
        this.weatherWord.textContent = cityName + 'の明日からの天気はこちらです。';
    }

    // Apiクラスはapiに関する処理を行います
    _Api(){
        const num = this.cityNum.value;
        // dateは変数
        date = this.date.innerHTML;
        weatherApi(num,date);
        // APIの結果を表示させる
        async function weatherApi(){
            const fet = await fetch('https://api.aoikujira.com/tenki/week.php?fmt=json&city=' + num);
            const jsons = await fet.json();
            jsons[num].forEach(el =>{ 
                date += el.date + ": " + el.forecast + '  最高気温:' + el.maxtemp + '度  最低気温:' + el.mintemp + '度   湿度:'  + el.pop + '<br>';
            });
            document.querySelector('.date').innerHTML = date;
        }
    }

}