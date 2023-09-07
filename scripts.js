document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "77b3e1e4561cf6afa80e587dae5f0f03";
  const getWeatherButton = document.getElementById("getWeather");
  const locationInput = document.getElementById("location");
  const weatherInfo = document.getElementById("weatherInfo");
  const weatherInfoLocation = document.getElementById("weatherInfo-location");
  const icon = document.getElementById("icon");
  const weatherResult = document.querySelector(".weatherResult");

  getWeatherButton.addEventListener("click", () => {
    const location = locationInput.value;
    weatherResult.classList.add("visible");

    if (location) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          const temperature = (data.main.temp - 273.15).toFixed(2); // Convert Kelvin to Celsius
          const weatherDescription = data.weather[0].description;
          weatherInfoLocation.textContent = location;

          //setting corresponding icons
          icon.src =
            weatherDescription === "broken clouds" ||
            weatherDescription === "scattered clouds"
              ? "/images/cloudy.svg"
              : weatherDescription === "thunderstorm"
              ? "/images/thunder.svg"
              : weatherDescription === "clear sky"
              ? "/images/day.svg"
              : weatherDescription === "rain" ||
                weatherDescription === "shower rain"
              ? "/images/rainy-5.svg"
              : weatherDescription === "few clouds"
              ? "/images/cloudy-day-1.svg"
              : weatherDescription === "snow"
              ? "/images/snowy-6.svg"
              : "/images/cloudy-day-1.svg";

          weatherInfo.innerHTML = `
                        <p class='temp'>${temperature}°C</p>
                        <p class='description'>${weatherDescription}</p>
                    `;
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          weatherInfo.innerHTML = "Could not fetch weather data.";
        });
    } else {
      weatherInfo.innerHTML = "Please enter a location.";
    }
  });
});
