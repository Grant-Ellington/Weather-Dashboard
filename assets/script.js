console.log('it works')

// var openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid='+ key
//var geoCode = 'http://api.openweathermap.org/geo/1.0/direct?q'+city+'&limit=5&appid='+ key
 var key = '9f2cdd9e0dd31d4e4d4ed780e91b0d27'

 var search = $('#search')
 var textarea = $('#textarea')
 var previousSeaches = $('#previousSearches')

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
    })
}

function getCurrentWeather(lat, lon){
fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+key).then(function(response){
return response.json();
}).then(function(data){
console.log(data)
})
}

function addPreviousSearch(location){
    console.log('hit 2')
var liEl = $('<button>')
    liEl.text(location)
    previousSeaches.append(liEl)  
}

search.on('click', function(){
    console.log('hit')
    searchLocation = textarea.val().trim();

    getLocation(searchLocation);
    addPreviousSearch(searchLocation)
})