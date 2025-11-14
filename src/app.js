function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperatureValue = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  let cityValue = response.data.city;
  let descriptionElement = document.querySelector("#description");
  let descriptionValue = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  let humidityValue = `${response.data.temperature.humidity}%`;
  let temperatureFeeling = document.querySelector("#temperature-feeling");
  let feelingValue = `${Math.round(response.data.temperature.feels_like)}°C`;
  let windSpeed = document.querySelector("#wind-speed");
  let windSpeedValue = `${response.data.wind.speed}km/h`;
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let latitude = document.querySelector("#latitude");
  let latitudeValue = response.data.coordinates.latitude;
  let longitude = document.querySelector("#longitude");
  let longitudeValue = response.data.coordinates.longitude;
  let iconElement = document.querySelector("#weather-icon");
  let iconValue = `<img
                src="${response.data.condition.icon_url}"
                class="weather-app-icon"
              />`;

  temperatureElement.innerHTML = temperatureValue;
  cityElement.innerHTML = cityValue;
  descriptionElement.innerHTML = descriptionValue;
  humidityElement.innerHTML = humidityValue;
  temperatureFeeling.innerHTML = feelingValue;
  windSpeed.innerHTML = windSpeedValue;
  timeElement.innerHTML = formatDate(date);
  latitude.innerHTML = latitudeValue;
  longitude.innerHTML = longitudeValue;
  iconElement.innerHTML = iconValue;

  getForecast(response.data.city);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "cfabea60f0eoe0t3bb3e16a70e85e14b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "cfabea60f0eoe0t3bb3e16a70e85e14b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            
            <img src="${
              day.condition.icon_url
            }" class="weather-forecast-icon"/> 
            
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}°</strong>
              </div>
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
          </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Polokwane");
