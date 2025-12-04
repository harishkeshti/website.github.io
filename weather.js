// script.js

const apiKey = "YOUR_API_KEY_HERE"; // fa0c52a089daa6a7bfd99b47bf995ebb <-- put your OpenWeatherMap API key here

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const message = document.getElementById("message");
const weatherCard = document.getElementById("weatherCard");

// DOM elements inside the card
const cityNameEl = document.getElementById("cityName");
const dateTimeEl = document.getElementById("dateTime");
const weatherIconEl = document.getElementById("weatherIcon");
const tempEl = document.getElementById("temperature");
const descEl = document.getElementById("description");
const feelsLikeEl = document.getElementById("feelsLike");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const pressureEl = document.getElementById("pressure");

// Click and Enter key events
searchBtn.addEventListener("click", () => {
  getWeather();
});

cityInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
});

async function getWeather() {
  const city = cityInput.value.trim();

  if (city === "") {
    showMessage("Please enter a city name.", "error");
    hideWeatherCard();
    return;
  }

  showMessage("Fetching weather data...", "info");

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={fa0c52a089daa6a7bfd99b47bf995ebb}{encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        showMessage("City not found. Please check the spelling.", "error");
      } else if (response.status === 401) {
        showMessage("Invalid API key. Check your OpenWeatherMap key.", "error");
      } else {
        showMessage("Error fetching data. Try again later.", "error");
      }
      hideWeatherCard();
      return;
    }

    const data = await response.json();
    updateWeatherUI(data);
    showMessage(""); // clear
  } catch (error) {
    console.error(error);
    showMessage("Network error. Check your internet connection.", "error");
    hideWeatherCard();
  }
}

function updateWeatherUI(data) {
  const {
    name,
    sys: { country },
    weather,
    main: { temp, feels_like, humidity, pressure },
    wind: { speed },
    dt,
    timezone,
  } = data;

  const description = weather[0].description;
  const iconCode = weather[0].icon;
  const iconUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={fa0c52a089daa6a7bfd99b47bf995ebb}';

  // Convert dt + timezone to local city time
  const localTime = new Date((dt + timezone) * 1000);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedTime = localTime.toLocaleString("en-IN", options);

  cityNameEl.textContent = '${name}, ${country}';
  dateTimeEl.textContent = formattedTime;
  weatherIconEl.src = iconUrl;
  weatherIconEl.alt = description;
  tempEl.textContent = '${Math.round(temp)}°C';
  descEl.textContent = description;
  feelsLikeEl.textContent = '${Math.round(feels_like)}°C';
  humidityEl.textContent = '${humidity}%';
  windEl.textContent = '${speed} m/s';
  pressureEl.textContent = '${pressure} hPa';

  weatherCard.classList.remove("hidden");
}

function showMessage(text, type) {
  message.textContent = text;
  message.className = "message"; // reset
  if (type) {
    message.classList.add(type);
  }
}

function hideWeatherCard() {
  weatherCard.classList.add("hidden");
}