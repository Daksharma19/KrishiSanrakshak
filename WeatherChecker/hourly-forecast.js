const API_KEY = "7445ba4fc3afd15caba0bbb03fae0a2b"; // OpenWeather API Key

// DOM Elements
const locationTitle = document.getElementById('location-title');
const hourlyContainer = document.getElementById('hourly-container');
const parametersContainer = document.getElementById('parameters-container');

// Get City from URL or default to "current search"
function getCityFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('city') || 'Mumbai'; // Default city is Mumbai if no query is present
}

// Fetch Hourly Forecast Data
async function fetchHourlyForecast(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    displayHourlyForecast(data);
    displayAdditionalParameters(data);
  } catch (error) {
    console.error('Error fetching hourly forecast:', error);
    locationTitle.textContent = "City not found. Please try again.";
    hourlyContainer.innerHTML = '';
    parametersContainer.innerHTML = '';
  }
}

// Display Hourly Forecast
function displayHourlyForecast(data) {
  locationTitle.textContent = `Hourly Forecast for ${data.city.name}`;
  hourlyContainer.innerHTML = ''; // Clear existing content

  const hourlyData = data.list.slice(0, 8); // Show first 8 hours of data
  hourlyData.forEach(hour => {
    const hourDiv = document.createElement('div');
    hourDiv.classList.add('hourly-item');
    hourDiv.innerHTML = `
      <p>${new Date(hour.dt * 1000).toLocaleTimeString()}</p>
      <img src="http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png" alt="${hour.weather[0].description}">
      <p>${Math.round(hour.main.temp)}°C</p>
    `;
    hourlyContainer.appendChild(hourDiv);
  });
}

// Display Additional Weather Parameters
function displayAdditionalParameters(data) {
  const currentData = data.list[0];
  const parameters = [
    { name: 'Wind Speed', value: `${currentData.wind.speed} m/s` },
    { name: 'Wind Direction', value: `${currentData.wind.deg}°` },
    { name: 'Pressure', value: `${currentData.main.pressure} hPa` },
    { name: 'Humidity', value: `${currentData.main.humidity}%` },
    { name: 'Cloud Coverage', value: `${currentData.clouds.all}%` },
  ];

  parametersContainer.innerHTML = ''; // Clear existing content
  parameters.forEach(param => {
    const paramDiv = document.createElement('div');
    paramDiv.classList.add('parameter-item');
    paramDiv.innerHTML = `
      <h3>${param.name}</h3>
      <p>${param.value}</p>
    `;
    parametersContainer.appendChild(paramDiv);
  });
}

// Update City and Fetch Data Dynamically
function updateCity(city) {
  const url = new URL(window.location.href);
  url.searchParams.set('city', city);
  window.history.pushState({}, '', url);
  fetchHourlyForecast(city);
}

// Initialize - Fetch for the current city in URL or default city
document.addEventListener('DOMContentLoaded', () => {
  const city = getCityFromURL();
  fetchHourlyForecast(city);

  // Add event listener to handle search from other pages
  const searchInput = document.getElementById('search');
  const searchButton = document.getElementById('searchButton');
  if (searchInput && searchButton) {
    searchButton.addEventListener('click', () => {
      const newCity = searchInput.value.trim();
      if (newCity) updateCity(newCity);
    });
  }
});
