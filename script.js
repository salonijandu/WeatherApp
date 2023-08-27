//Creating Variables

const weatherForm = document.querySelector("form");
const inputField = document.querySelector("input");
const weatherIcon = document.querySelector(".weatherIcon i");
const weatherCondition = document.querySelector(".weatherCondition");
const temperature = document.querySelector(".temperature span");
const place = document.querySelector(".place");
const date = document.querySelector(".date");

const currentDate = new Date();
const monthFormat = { month: "long" };
const monthName = currentDate.toLocaleString("en-us", monthFormat);
date.textContent = currentDate.getDate() + ", " + monthName;

/*console.log(
  new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  })
  Output: Saturday, Aug 26, 2023
);*/

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  place.textContent = "Loading...";
  weatherIcon.className = "";
  temperature.textContent = "";
  weatherCondition.textContent = "";
  const url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    encodeURIComponent(inputField.value) +
    "&appid=" +
    "ef39dfd19d05e2908f7d4bbaab0e0e4e";
  showData(url);
});

function showData(url) {
  getWeatherData(url, function (result) {
    console.log(result);
    if (result.cod == 200) {
      //So Weather Icons match with the API data
      if (
        result?.weather[0]?.description == "rain" ||
        result?.weather[0]?.description == "fog"
      ) {
        weatherIcon.className = "wi wi-day-" + result?.weather[0]?.description;
      } else {
        weatherIcon.className = "wi wi-day-cloudy";
      }

      place.textContent = result?.name;
      //Convert Kelvin temp to C, toFixed(2) will only show 2 values of decimal, and the sign of degree is fromCharCode(176)
      temperature.textContent =
        (result?.main?.temp - 273.5).toFixed(2) +
        String.fromCharCode(176) +
        "C";
      weatherCondition.textContent =
        result?.weather[0]?.description?.toUpperCase();
    } else {
      place.textContent = "City Not Found!!!";
    }
  });
}

function getWeatherData(url, callback) {
  fetch(url).then((response) => {
    response.json().then((data) => {
      callback(data);
    });
  });
}
