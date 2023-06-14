const axios = require('axios');

const openWeatherMapApiKey = '54a2999fedf0415e88de92264d6355f3';

function getWeatherForecast(city, interval) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${openWeatherMapApiKey}&units=metric`;

  return axios.get(apiUrl)
    .then((response) => {
        const forecastList = response.data.list;
      const filteredForecast = forecastList.filter((forecast, index) => {
        if (interval === '3') {
          return forecast;
        } else {
          return index % 2 === 0;
        }
      });

      let forecastText = `Weather forecast for ${city}:\n\n`;
      filteredForecast.forEach((forecast) => {
        const dateTime = forecast.dt_txt;
        const temperature = forecast.main.temp;
        const weatherDescription = forecast.weather[0].description;
        forecastText += `${dateTime}: ${temperature}°C, ${weatherDescription}\n`;
      });

      return forecastText;
    });
}

module.exports = getWeatherForecast