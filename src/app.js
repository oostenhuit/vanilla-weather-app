let apiKey = "a7de365924edf156fe268686a1a61738";
let units = "metric";

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekday = days[date.getDay()];
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `${weekday}, ${hour}:${minutes}`;
}

function showTemperature(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#time").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].main);
  celsiusTemperature = response.data.main.temp;
}

function showCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityValue = document.querySelector("#city-value").value;
  showCity(cityValue);
}
function showFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let fahrenheitElement = document.querySelector("#temperature");
  fahrenheitElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

function showCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusElement = document.querySelector("#temperature");
  celsiusElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

showCity("Berlin");
