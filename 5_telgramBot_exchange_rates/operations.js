const axios = require('axios');
const NodeCache = require('node-cache');

// -----------WEATHER API OPERATIONS----------------

const { weatherApiKey } = process.env;

function getWeatherForecast(city, interval) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}&units=metric`;

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

// -----------EXCHANGE RATE OPERATIONS----------------
const cache = new NodeCache();

async function privatBankRateApi(currency) {
  const cacheKey = `privatbank_rate_${currency}`;
  const cachedRate = cache.get(cacheKey);

  if (cachedRate) {
    return cachedRate;
  }

  try {
    const response = await axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
    const exchangeRate = response.data.find(rate => rate.ccy === currency && rate.base_ccy === 'UAH');
    cache.set(cacheKey, exchangeRate, 60);

    return exchangeRate;
  } catch (error) {
      console.error('Failed to fetch PrivatBank exchange rate', error);
      throw error;
  }
}

async function monobankRateApi(currency) {
  const cacheKey = `monobank_rate_${currency}`;
  const cachedRate = cache.get(cacheKey);

  if (cachedRate) {
    return cachedRate;
  }

  try {
    const response = await axios.get('https://api.monobank.ua/bank/currency');
    let currencyCode = null;
    if (currency === 'USD') {
      currencyCode = 840;
    } else {
      currencyCode = 978;
    }
    const exchangeRate = response.data.find(rate => rate.currencyCodeA === currencyCode && rate.currencyCodeB === 980);
    cache.set(cacheKey, exchangeRate, 60);

    return exchangeRate;
  } catch (error) {
      console.error('Failed to fetch Monobank exchange rate', error);
      throw error;
  }
}

async function getExchangeRates(currency) {
  const privatBankRate = await privatBankRateApi(currency);
  const monobankRate = await monobankRateApi(currency);

  return `PrivatBank ${ currency } exchange rate: ${ privatBankRate.buy } / ${ privatBankRate.sale }\n` +
    `Monobank ${ currency } exchange rate: ${ monobankRate.rateBuy } / ${ monobankRate.rateSell }\n` 
}

// -----------EXPORTS----------------

module.exports = {
  getWeatherForecast,
  getExchangeRates
}