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

//__________________________-


const NodeCache = require('node-cache');

// Create a cache instance with a TTL of 60 seconds
const cache = new NodeCache({ stdTTL: 60 });

// Function to fetch exchange rates from PrivatBank API
async function fetchPrivatBankExchangeRate() {
  const cacheKey = 'privatbank_rate';
  const cachedRate = cache.get(cacheKey);

  if (cachedRate) {
    return cachedRate;
  }

  try {
    const response = await axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
    const exchangeRate = response.data.find(rate => rate.ccy === 'USD' && rate.base_ccy === 'UAH');
    
    // Cache the exchange rate for 60 seconds
    cache.set(cacheKey, exchangeRate, 60);

    return exchangeRate;
  } catch (error) {
    console.error('Failed to fetch PrivatBank exchange rate', error);
    throw error;
  }
}

// Function to fetch exchange rates from Monobank API
async function fetchMonobankExchangeRate() {
  const cacheKey = 'monobank_rate';
  const cachedRate = cache.get(cacheKey);

  if (cachedRate) {
    return cachedRate;
  }

  try {
    const response = await axios.get('https://api.monobank.ua/bank/currency');
    const exchangeRate = response.data.find(rate => rate.currencyCodeA === 840 && rate.currencyCodeB === 980);
    
    // Cache the exchange rate for 60 seconds
    cache.set(cacheKey, exchangeRate, 60);

    return exchangeRate;
  } catch (error) {
    console.error('Failed to fetch Monobank exchange rate', error);
    throw error;
  }
}

// Example usage
async function getExchangeRates() {
 
  const privatBankRate = await fetchPrivatBankExchangeRate();
  const monobankRate = await fetchMonobankExchangeRate();
  
  const rate = `PrivatBank USD/UAH exchange rate: ${ privatBankRate.buy }\n` + `Monobank USD/UAH exchange rate: ${ monobankRate.rateBuy }\n` 
 return rate
}
//_____________________________________________________


module.exports = {
  getWeatherForecast,
  getExchangeRates
}