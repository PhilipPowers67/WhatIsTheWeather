var APIkey = "122561f5367f8dc633ec00c6174086ec"
// var city = "";
// var apiCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}`
var searchButton = document.getElementById("search-btn")
var cityname = document.getElementById("searchInput")  
var userFormEl = document.getElementById("userInput")


// Current Weather




function fetchGeo(city) {
    var geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIkey}`
    fetch(geoUrl)
    .then(function(response){
        return response.json();
        
    })
    .then(function(data){
        var lat = data[0].lat;
        var lon = data[0].lon;

        fetchWeather(lat, lon);
    })
    
}

function fetchWeather(lat, lon) {
    var apiCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}`
    fetch(apiCall)
        .then(function(response) { 
            return response.json();
        })
        .then(function(data){
             console.log(apiCall);
             console.log(data);
        })
    
};

function searchHistory() {
    var ul = document.getElementById("cityList");
    var li = document.createElement("li");
    var saveCity = document.getElementById("searchInput");
    li.appendChild(document.createTextNode(saveCity.value));
    ul.appendChild(li);
}

searchButton.addEventListener("click", function(e) {
    console.log(cityname.value)
    fetchGeo(cityname.value)
})


