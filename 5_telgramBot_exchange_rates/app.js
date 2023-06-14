
const getWeatherForecast = require('./operations')
const TelegramBot = require('node-telegram-bot-api');

// const { TOKEN } = process.env;
const TOKEN = '6032565948:AAGouNkYRNmnK1IiYPRv6DrM6ao13TBGf3I';
const city = 'Kyiv'

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  
    if (msg.text === '/start' || msg.text === 'Main menu') {
        bot.sendMessage(chatId, 'Choose the category', {
          reply_markup: {
            keyboard: [
              [
                { text: `Weazer`, callback_data: `${city}` }
              ],
              [
                { text: `Exchange rate`, callback_data: `rate` }
              ]
            ]
          }
        });
      
    } else if (msg.text === 'Weazer') {
        bot.sendMessage(chatId, `Please select the forecast interval for ${ city }:`, {
          reply_markup: {
            keyboard: [
              [
                { text: 'Every 3 hours' },
                { text: 'Every 6 hours' }
              ],
              [{ text: 'Main menu' }]
            ]
          }
        })
      
    } else if (msg.text === 'Exchange rater') {
      console.log('Exchange rate');

    } else if (msg.text === 'Every 3 hours' || msg.text === 'Every 6 hours') {
      const interval = msg.text.split(" ")[1];
        getWeatherForecast(city, interval)
            .then((forecast) => {
                bot.sendMessage(chatId, forecast);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

