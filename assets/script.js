var searchCity = document.getElementById('searchcity')
var searchButton = document.getElementById('searchbutton')
var clearButton = document.getElementById('clearhistory')
var currentcity = document.getElementById('currentcity')
var currentTemperature = document.getElementById("temperature");
var currentHumidty = document.getElementById("humidity");
var currentWSpeed = document.getElementById("windspeed");
var currentIcon = document.getElementById('currentIcon');
var listGroups = document.getElementById('listgroup')
var ApiKeys = 'eba5c6fab43db05b5ed6b0cae2ececc4';
var dayjs = dayjs()
var iconURL = "https://openweathermap.org/img/wn/"
// iconURL + main.icon + ".png"

function showCityBtns() {
    listGroups.textContent = '';
    var cityArray = JSON.parse(localStorage.getItem('cities'))
    for (var index = 0; index < cityArray.length; index++) {
        var city = cityArray[index];
        var btn = document.createElement('button')
        btn.textContent = city;
        btn.classList.add('cityBtn')
        listGroups.appendChild(btn);

    }
}

function showCity(event) {
    var city = event.target.textContent
    weatherLookup(city);
}

function getCity(event) {
    event.preventDefault()
    var city = searchCity.value
    var cityArray = JSON.parse(localStorage.getItem('cities')) || []
    cityArray.push(city)
    localStorage.setItem('cities', JSON.stringify(cityArray))
    showCityBtns()
    weatherLookup(city)
}


function weatherLookup(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + ApiKeys + "&units=imperial") // using fetch for Api
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            currentcity.textContent = data.name;
            currentIcon.setAttribute('src', iconURL + data.weather[0].icon + ".png")
            currentTemperature.textContent = data.main.temp
            currentHumidty.textContent = data.main.humidity
            currentWSpeed.textContent = data.wind.speed

            getFiveDay(data.coord.lat, data.coord.lon)
        });
}

function getFiveDay(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${ApiKeys}&units=imperial`) // using 5 day Api
        .then(function (response) {
            return response.json()
        })
        .then(function (fiveData) {
            console.log(fiveData)

            // day 1 getting element by id to recieve data from Api
            document.getElementById('Date0').textContent = dayjs.format('dddd')
            document.getElementById('Img0').setAttribute("src", iconURL + fiveData.list[0].weather[0].icon + '.png')
            document.getElementById('Temp0').textContent = fiveData.list[0].main.temp
            document.getElementById('Humidity0').textContent = fiveData.list[0].main.humidity
            document.getElementById('Windspeed0').textContent = fiveData.list[0].wind.speed

            // day2
            document.getElementById('Date1').textContent = dayjs.add(1, 'days').format('dddd')
            document.getElementById('Img1').setAttribute("src", iconURL + fiveData.list[8].weather[0].icon + '.png')
            document.getElementById('Temp1').textContent = fiveData.list[8].main.temp
            document.getElementById('Humidity1').textContent = fiveData.list[8].main.humidity
            document.getElementById('Windspeed1').textContent = fiveData.list[8].wind.speed

            // day3
            document.getElementById('Date2').textContent = dayjs.add(2, 'days').format('dddd')
            document.getElementById('Img2').setAttribute("src", iconURL + fiveData.list[16].weather[0].icon + '.png')
            document.getElementById('Temp2').textContent = fiveData.list[16].main.temp
            document.getElementById('Humidity2').textContent = fiveData.list[16].main.humidity
            document.getElementById('Windspeed2').textContent = fiveData.list[16].wind.speed

            // day4
            document.getElementById('Date3').textContent = dayjs.add(3, 'days').format('dddd')
            document.getElementById('Img3').setAttribute("src", iconURL + fiveData.list[24].weather[0].icon + '.png')
            document.getElementById('Temp3').textContent = fiveData.list[24].main.temp
            document.getElementById('Humidity3').textContent = fiveData.list[24].main.humidity
            document.getElementById('Windspeed3').textContent = fiveData.list[24].wind.speed

            // day5
            document.getElementById('Date4').textContent = dayjs.add(4, 'days').format('dddd')
            document.getElementById('Img4').setAttribute("src", iconURL + fiveData.list[32].weather[0].icon + '.png')
            document.getElementById('Temp4').textContent = fiveData.list[32].main.temp
            document.getElementById('Humidity4').textContent = fiveData.list[32].main.humidity
            document.getElementById('Windspeed4').textContent = fiveData.list[32].wind.speed

        })
}

searchButton.addEventListener('click', getCity)
listGroups.addEventListener('click', showCity)
showCityBtns()