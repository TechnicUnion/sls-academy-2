
const getWeatherForecast = require('./operations')
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(TOKEN, { polling: true });

const { TOKEN } = process.env;
const city = 'Kyiv'

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Weather Forecast Bot', {
    reply_markup: {
      inline_keyboard: [
        [
          { text: `Forecast in ${city}`, callback_data: `${city}` }
        ]
      ]
    }
  });
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
    if (query.data === city) {
        bot.sendMessage(chatId, `Please select the forecast interval for ${ city }:`, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Every 3 hours ', callback_data: `${city}-3h` },
          { text: 'Every 6 hours', callback_data: `${city}-6h` }
        ]
      ]
    }
        })
    } else {
        const [city, interval] = query.data.split('-');
        getWeatherForecast(city, interval)
            .then((forecast) => {
                bot.sendMessage(chatId, forecast);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

