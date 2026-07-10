const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");

const weatherInfoSection = document.querySelector(".weather-info");
const notFoundSection = document.querySelector(".not-found");
const searchCitySection = document.querySelector(".search-city");

const countryTxt = document.querySelector('.country-txt');
const tempTxt = document.querySelector('.temp-txt');
const conditionTxt = document.querySelector('.condition-txt');
const humidityValueTxt = document.querySelector('.humidity-value-txt');
const windValueTxt = document.querySelector('.wind-value-txt');
const weatherSummaryImg = document.querySelector('.weather-summary-img');
const currentDateTxt = document.querySelector('.current-date-txt');

// API key moved to backend proxy. Frontend will call `/api/weather?city=` on the same origin.

searchBtn.addEventListener("click", () => {
  if (cityInput.value.trim() !== "") {
    updateWeatherInfo(cityInput.value);
    cityInput.value = "";
    cityInput.blur();
  }
});

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && cityInput.value.trim() !== "") {
    updateWeatherInfo(cityInput.value);
    cityInput.value = "";
    cityInput.blur();
  }
});

function getWeatherIcon(weatherId) {
  if (weatherId >= 200 && weatherId < 300) {
    return "thunderstorm.png";
  } else if (weatherId >= 300 && weatherId < 500) {
    return "drizzle.png";
  } else if (weatherId >= 500 && weatherId < 600) {
    return "rain.png";
  } else if (weatherId >= 600 && weatherId < 700) {
    return "snowy.png";
  } else if (weatherId >= 700 && weatherId < 800) {
    return "atmosphere.png";
  } else if (weatherId === 800) {
    return "clear.png";
  } else {
    return "cloudy.png";
  } 
}

async function getFetchData(endPoint, city) {
  // We proxy weather requests through our backend to keep the API key secret.
  try {
    const apiUrl = `/api/weather?city=${encodeURIComponent(city)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('getFetchData proxy error', err);
    return null;
  }
}

async function updateWeatherInfo(city) {
  const weatherData = await getFetchData('weather', city);

  if (weatherData.cod !== 200) {
    showDisplaySection(notFoundSection);
    return;
  }

  const { 
    name: country,
    main: { temp, humidity },
    weather: [{ id, main }],
    wind: { speed }
  } = weatherData;

  countryTxt.textContent = country;
  tempTxt.textContent = `${Math.round(temp)}°C`;
  conditionTxt.textContent = main;
  humidityValueTxt.textContent = `${humidity}%`;
  windValueTxt.textContent = `${speed} M/s`;

  weatherSummaryImg.src = `assets/${getWeatherIcon(id)}`;


  showDisplaySection(weatherInfoSection);
}

function showDisplaySection(section) {
  [weatherInfoSection, notFoundSection, searchCitySection]
    .forEach(section => section.style.display = "none");

  section.style.display = "flex";
}