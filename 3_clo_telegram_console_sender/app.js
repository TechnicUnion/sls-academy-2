// '6032565948:AAGouNkYRNmnK1IiYPRv6DrM6ao13TBGf3I'
process.env["NTBA_FIX_350"] = 1

const { program } = require('commander');
const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '6032565948:AAGouNkYRNmnK1IiYPRv6DrM6ao13TBGf3I';
const CHAT_ID = "534196505"

const bot = new TelegramBot(TOKEN, {polling: true});

program
  .command('message <message>')
  .description('Send a message to the Telegram bot')
  .alias('m')
  .action(async(message) => {
    await bot.sendMessage(CHAT_ID, message)
  process.exit(0);
  });

program
  .command('photo <path>')
  .description('Send a photo to the Telegram bot. Just drag and drop it to consol after p-flag.')
  .alias('p')
  .action(async(path) => {
    await bot.sendPhoto(CHAT_ID, path);
  process.exit(0);
  });

program.parse(process.argv);

