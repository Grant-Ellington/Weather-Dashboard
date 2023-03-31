console.log('it works')

// var openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid='+ key
//var geoCode = 'http://api.openweathermap.org/geo/1.0/direct?q'+city+'&limit=5&appid='+ key
 var key = '9f2cdd9e0dd31d4e4d4ed780e91b0d27'

 var search = $('#search')
 var textarea = $('#textarea')
 var previousSearches = $('#previousSearches')

 var cityName = $('#cityName');
 var dateToday = $('#dateToday');
 var iconToday = $('#iconToday');
 var tempToday = $('#tempToday');
 var humToday = $('#humToday');
 var speedToday = $('#speedToday');

 var dayOneIcon = $('#dayOneIcon');
 var dayOneTemp = $('#dayOneTemp');
 var dayOneHum = $('#dayOneHum');
 var dayOneSpeed = $('#dayOneSpeed');

 var dayTwoIcon = $('#dayTwoIcon');
 var dayTwoTemp = $('#dayTwoTemp');
 var dayTwoHum = $('#dayTwoHum');
 var dayTwoSpeed = $('#dayTwoSpeed');

 var dayThreeIcon = $('#dayThreeIcon');
 var dayThreeTemp = $('#dayThreeTemp');
 var dayThreeHum = $('#dayThreeHum');
 var dayThreeSpeed = $('#dayThreeSpeed');

 var dayFourIcon = $('#dayFourIcon');
 var dayFourTemp = $('#dayFourTemp');
 var dayFourHum = $('#dayFourHum');
 var dayFourSpeed = $('#dayFourSpeed');

 var dayFiveIcon = $('#dayFiveIcon');
 var dayFiveTemp = $('#dayFiveTemp');
 var dayFiveHum = $('#dayFiveHum');
 var dayFiveSpeed = $('#dayFiveSpeed');

var city = localStorage.getItem('searchLocation')
getLocation(city)
 function getLocation(city){
    fetch('https://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=5&appid='+ key).then(function(response){
        return response.json()
    }).then(function(data){
        var lat = data[0].lat
        var lon = data[0].lon
        getForecast(lat, lon)
        getCurrentWeather(lat,lon)
    })
}

function getForecast(lat,lon){
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid='+ key).then(function(response){
        return response.json()}
    ).then(function(data){
        console.log(data)
        displayForecast(data)
    })
}

function getCurrentWeather(lat, lon){
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+key).then(function(response){
    return response.json();
    }).then(function(currentWeather){
        console.log(currentWeather)
        displayCurrentWeather(currentWeather)  
    })
}
function displayCurrentWeather (currentWeather){
    console.log(currentWeather)

    var temp = Math.round((currentWeather.main.temp - 273.15)*1.8 + 32)
    tempToday.text(`Temperature: ${temp}°F`)
    cityName.text(currentWeather.name)
    dateToday.text(dayjs().format('MMMM D, YYYY'))
    humToday.text(`Humidity: ${currentWeather.main.humidity}`)
    speedToday.text(`Wind speed: ${currentWeather.wind.speed} `)
    iconToday.html(`<img src = 'http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png'>`)
};

function displayForecast(data){
    console.log(data)
    
    dayOneIcon.html(`<img src = 'http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png'></img>`)
    dayOneTemp.text(`Temperature : ${Math.round((data.list[0].main.temp - 273.15)*1.8 + 32)}°F`)
    dayOneHum.text(`Humidity: ${data.list[0].main.humidity}`)
    dayOneSpeed.text(`Wind Speed: ${data.list[0].wind.speed} mph`)

    dayTwoIcon.html(`<img src = 'http://openweathermap.org/img/w/${data.list[4].weather[0].icon}.png'></img>`)
    dayTwoTemp.text(`Temperature : ${Math.round((data.list[4].main.temp - 273.15)*1.8 + 32)}°F`)
    dayTwoHum.text(`Humidity: ${data.list[4].main.humidity}`)
    dayTwoSpeed.text(`Wind Speed: ${data.list[4].wind.speed} mph`)

    dayThreeIcon.html(`<img src = 'http://openweathermap.org/img/w/${data.list[11].weather[0].icon}.png'></img>`)
    dayThreeTemp.text(`Temperature : ${Math.round((data.list[11].main.temp - 273.15)*1.8 + 32)}°F`)
    dayThreeHum.text(`Humidity: ${data.list[11].main.humidity}`)
    dayThreeSpeed.text(`Wind Speed: ${data.list[11].wind.speed} mph`)

    dayFourIcon.html(`<img src = 'http://openweathermap.org/img/w/${data.list[19].weather[0].icon}.png'></img>`)
    dayFourTemp.text(`Temperature : ${Math.round((data.list[19].main.temp - 273.15)*1.8 + 32)}°F`)
    dayFourHum.text(`Humidity: ${data.list[19].main.humidity}`)
    dayFourSpeed.text(`Wind Speed: ${data.list[19].wind.speed} mph`)

    dayFiveIcon.html(`<img src = 'http://openweathermap.org/img/w/${data.list[28].weather[0].icon}.png'></img>`)
    dayFiveTemp.text(`Temperature : ${Math.round((data.list[28].main.temp - 273.15)*1.8 + 32)}°F`)
    dayFiveHum.text(`Humidity: ${data.list[28].main.humidity}`)
    dayFiveSpeed.text(`Wind Speed: ${data.list[28].wind.speed} mph`)
}

function addPreviousSearch(location){
    var liEl = $(`<button class='btn btn-info btn-block btn-history'>${location}</button>`)
    previousSearches.append(liEl)  
}

$('#previousSearches').on("click", ".btn-history", function(event) {
    var cityNameFromBtn = $(this).text();
    console.log(cityNameFromBtn);
    getLocation(cityNameFromBtn);
})

search.on('click', function(){
  
    searchLocation = textarea.val().trim();
    localStorage.setItem("searchLocation", searchLocation)

    getLocation(searchLocation);
    addPreviousSearch(searchLocation)
})