const API_KEY = "7445ba4fc3afd15caba0bbb03fae0a2b"; // OpenWeather API Key
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

// DOM Elements
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const weatherIcon = document.getElementById("weather-icon");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const aqiElement = document.getElementById("aqi");
const humidityElement = document.getElementById("humidity");
const precipitationElement = document.getElementById("precipitation");
const uvIndexElement = document.getElementById("uv-index");
const forecastContainer = document.getElementById("forecast-container");
const locationTitle = document.getElementById("location-title");
const hourlyContainer = document.getElementById("hourly-container");
const parametersContainer = document.getElementById("parameters-container");

// Cities for India Map
const cities = [
  { name: "Delhi", lat: 28.6139, lon: 77.209 },
  { name: "Mumbai", lat: 19.076, lon: 72.8777 },
  { name: "Bangalore", lat: 12.9716, lon: 77.5946 },
  { name: "Kolkata", lat: 22.5726, lon: 88.3639 },
  { name: "Chennai", lat: 13.0827, lon: 80.2707 },
];

// Fetch Weather for User's Location on Page Load
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const response = await fetchWeatherByCoords(latitude, longitude);
      displayWeather(response);
    });
  }
});

// Search Weather by City
searchButton.addEventListener("click", async () => {
  const city = searchInput.value.trim();
  if (city) {
    const response = await fetchWeatherByCity(city);
    displayWeather(response);
    fetchForecast(city);
  }
});

// Fetch Weather by City
async function fetchWeatherByCity(city) {
  const response = await fetch(
    `${BASE_URL}weather?q=${city}&units=metric&appid=${API_KEY}`
  );
  return response.json();
}

// Fetch Weather by Coordinates
async function fetchWeatherByCoords(lat, lon) {
  const response = await fetch(
    `${BASE_URL}weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  return response.json();
}

// Display Weather Data
function displayWeather(data) {
  locationElement.textContent = `${data.name}, ${data.sys.country}`;
  temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
  descriptionElement.textContent = capitalizeFirstLetter(
    data.weather[0].description
  );
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
  precipitationElement.textContent = `Precipitation: ${
    data.rain ? data.rain["1h"] : 0
  }mm`;

  // Fetch and Display AQI
  fetchAQI(data.coord.lat, data.coord.lon);

  // Fetch and Display UV Index
  fetchUVIndex(data.coord.lat, data.coord.lon);

  // Dynamic Background Theme
  updateBackground(data.weather[0].main);

  // Extreme Weather Warning
  displayWarnings(data);
}

// Fetch AQI
async function fetchAQI(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  const data = await response.json();
  aqiElement.textContent = `Air Quality: ${data.list[0].main.aqi}`;
}

// Fetch UV Index
async function fetchUVIndex(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  const data = await response.json();
  uvIndexElement.textContent = `UV Index: ${Math.round(data.value)}`;
}

// Fetch Forecast
async function fetchForecast(city) {
  const response = await fetch(
    `${BASE_URL}forecast?q=${city}&units=metric&appid=${API_KEY}`
  );
  const data = await response.json();
  updateForecast(data.list);
  displayHourlyForecast(data);
  displayAdditionalParameters(data);
}

// Update Forecast
function updateForecast(forecastList) {
  forecastContainer.innerHTML = "";
  for (let i = 0; i < forecastList.length; i += 8) {
    const forecast = forecastList[i];
    const date = new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
      weekday: "short",
    });
    const icon = forecast.weather[0].icon;
    const temp = Math.round(forecast.main.temp);

    forecastContainer.innerHTML += `
      <div class="forecast-item">
        <p>${date}</p>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon">
        <p>${temp}°C</p>
      </div>`;
  }
}

// Display Hourly Forecast
function displayHourlyForecast(data) {
  locationTitle.textContent = `Hourly Forecast for ${data.city.name}`;
  hourlyContainer.innerHTML = "";

  // First 24 hours
  const hourlyData = data.list.slice(0, 8);
  hourlyData.forEach(hour => {
    const hourDiv = document.createElement("div");
    hourDiv.classList.add("hourly-item");
    hourDiv.innerHTML = `
      <p>${new Date(hour.dt * 1000).toLocaleTimeString()}</p>
      <img src="http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png">
      <p>${Math.round(hour.main.temp)}°C</p>
    `;
    hourlyContainer.appendChild(hourDiv);
  });
}

// Display Additional Parameters
function displayAdditionalParameters(data) {
  const currentData = data.list[0];
  const parameters = [
    { name: 'Wind Speed', value: `${currentData.wind.speed} m/s` },
    { name: 'Wind Direction', value: `${currentData.wind.deg}°` },
    { name: 'Pressure', value: `${currentData.main.pressure} hPa` },
    { name: 'Sea Level', value: `${currentData.main.sea_level} m` },
    { name: 'Ground Level', value: `${currentData.main.grnd_level} m` },
    { name: 'Cloud Coverage', value: `${currentData.clouds.all}%` },
    { name: 'Rain (3h)', value: `${currentData.rain ? currentData.rain['3h'] : 0} mm` },
    { name: 'Snow (3h)', value: `${currentData.snow ? currentData.snow['3h'] : 0} mm` },
    { name: 'Humidity', value: `${currentData.main.humidity}%` },
    { name: 'Feels Like', value: `${Math.round(currentData.main.feels_like)}°C` }
  ];

  parameters.forEach(param => {
    const paramDiv = document.createElement("div");
    paramDiv.classList.add("parameter-item");
    paramDiv.innerHTML = `
      <h3>${param.name}</h3>
      <p>${param.value}</p>
    `;
    parametersContainer.appendChild(paramDiv);
  });
}

// Update Background Theme
function updateBackground(weather) {
  const body = document.body;
  const themes = {
    Clear: "linear-gradient(to bottom, #fbc531, #f7d794, #ffeaa7)",
    Clouds: "linear-gradient(to bottom, #d2dae2, #a4b0be, #747d8c)",
    Rain: "linear-gradient(to bottom, #1e90ff, #3742fa, #5352ed)",
    Snow: "linear-gradient(to bottom, #dff9fb, #c7ecee, #a4b0be)",
    Thunderstorm: "linear-gradient(to bottom, #2f3640, #353b48, #718093)",
  };
  body.style.background = themes[weather] || "radial-gradient(circle, #1d3557, #457b9d, #a8dadc)";
}

// Display Extreme Weather Warnings
function displayWarnings(data) {
  const temp = data.main.temp;
  const warningContainer = document.createElement("div");
  warningContainer.id = "warning";

  if (temp < 5 || temp > 40 || data.weather[0].main === "Rain") {
    warningContainer.textContent = "⚠️ Extreme Weather Warning!";
    document.body.appendChild(warningContainer);
  } else {
    const existingWarning = document.getElementById("warning");
    if (existingWarning) existingWarning.remove();
  }
}

// Utility Function to Capitalize First Letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
