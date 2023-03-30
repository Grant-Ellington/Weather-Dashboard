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
 var speedToday = $('#speedToday')

 function getLocation(city){
    fetch('https://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=5&appid='+ key).then(function(response){
        return response.json()
    }).then(function(data){
        console.log(data)
        var lat = data[0].lat
        var lon = data[0].lon
        getWeather(lat, lon)
        getCurrentWeather(lat,lon)
    })
}

function getWeather(lat,lon){
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid='+ key).then(function(response){
        return response.json()}
    ).then(function(data){
        console.log(data)
        // displayCurrentWeather(data)
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

function addPreviousSearch(location){
    var liEl = $(`<button class='btn-history'>${location}</button>`)
    previousSearches.append(liEl)  
}

$('#previousSearches').on("click", ".btn-history", function(event) {
    var cityNameFromBtn = $(this).text();
    console.log(cityNameFromBtn);
    getLocation(cityNameFromBtn);
})

search.on('click', function(){
  
    searchLocation = textarea.val().trim();

    getLocation(searchLocation);
    addPreviousSearch(searchLocation)
})