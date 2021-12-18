const APIkey = "122561f5367f8dc633ec00c6174086ec";
// var city = "";
var searchButton = document.getElementById("search-btn");
var cityName = document.getElementById("searchInput");
var userFormEl = document.getElementById("userInput");
var searchHistoryArr = [];
var recoverHistory = JSON.parse(localStorage.getItem("city"));
var currentWeatherEl = document.getElementById("current-weather");
searchHistoryArr = searchHistoryArr.concat(recoverHistory);
console.log(recoverHistory);
var historyEl = document.getElementById("history")
// Current Weather
var currentNameDate = document.querySelector(".current-name-date");
var currentTemp = document.querySelector(".current-temp");
var currentWind = document.querySelector(".current-wind");
var currentHumidity = document.querySelector(".current-humidity");
var currentUVI = document.querySelector(".current-UVI");

function fetchGeo(city) {
  var geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIkey}`;
  fetch(geoUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;

      fetchWeather(lat, lon);
    });
}

function fetchWeather(lat, lon) {
  var apiCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`;
  fetch(apiCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(apiCall);
      console.log(data);
      for (let i = 0; i < 5; i++) {
        //   const element = array[i];
        var unix = data.daily[i].dt * 1000;
        console.log(new Date(unix).toLocaleString());
        console.log(Math.round(data.daily[i].temp.day));
        console.log(data.daily[i].wind_speed);
        console.log(data.daily[i].humidity);
        console.log(data.daily[i].uvi);
      }
      populateData(data.daily);
      console.log(data.daily.length);
    });
}

function searchHistory() {
  var ul = document.getElementById("cityList");
  var li = document.createElement("li");
  
  var saveCity = document.getElementById("searchInput");
  li.appendChild(document.createTextNode(saveCity.value));
  ul.appendChild(li);

  searchHistoryArr.push(cityName.value);
  localStorage.setItem("city", JSON.stringify(searchHistoryArr));
  // console.log(searchHistoryArr);
}

function getWeather(cityName) {
  var geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIkey}`;
  fetch(geoUrl).then(function (response) {
    const currentDate = new DataTransfer(response.data.dt * 1000);
    const day = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    cityName.innerHTML =
      response.data.name + "(" + month + "/" + day + "/" + year + ")";
    let;
  });
}

function populateData(data) {
  currentNameDate.textContent = cityName.value + " " + new Date(data[0].dt * 1000).toLocaleString();
  currentTemp.textContent = "Temp: " + Math.round(data[0].temp.day) + " °F"
  currentWind.textContent = "Wind: " + data[0].wind_speed + " MPH";
  currentHumidity.textContent = "Humidity: " + data[0].humidity;
  currentUVI.textContent = "UV Index: " + data[0].uvi;
  for (let i = 1; i < 6; i++) {
    var unix = data[i].dt * 1000;
    var forecastCard = document.querySelector(`[data-value="${i}"]`);
    forecastCard.querySelector(".date").textContent = new Date(unix).toLocaleString();
    forecastCard.querySelector(".temp").textContent = "Temp: " + Math.round(data[i].temp.day) + " °F"
    forecastCard.querySelector(".wind").textContent = "Wind: " + data[i].wind_speed + " MPH";
    forecastCard.querySelector(".humidity").textContent = "Humidity: " + data[i].humidity;


  }
  console.log(data);
}

searchButton.addEventListener("click", function (e) {
  //  console.log(cityname.value)
//   fetchGeo(cityName.value);
    const citySearch = cityName.value;
    fetchGeo(citySearch);
    searchHistoryArr.push(citySearch);
    localStorage.setItem("city", JSON.stringify(recoverHistory));
    renderRecoverHistory();
});

function renderRecoverHistory() {
    historyEl.innerHTML = "";
    for (let i = 0; i < searchHistory.length; i++) {
        const cityItem = document.createElement("input");
        cityItem.setAttribute("type", "text");
        cityItem.setAttribute("readonly", true);
        cityItem.setAttribute("class", "form-control");
        cityItem.setAttribute("value", recoverHistory[i]);
        cityItem.addEventListener("click", function () {
            getWeather(cityItem.value);
        })
        historyEl.append(cityItem);
    }
}