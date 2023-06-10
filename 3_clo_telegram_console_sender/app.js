// '6032565948:AAGouNkYRNmnK1IiYPRv6DrM6ao13TBGf3I'
process.env["NTBA_FIX_350"] = 1

const { program } = require('commander');
const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '6032565948:AAGouNkYRNmnK1IiYPRv6DrM6ao13TBGf3I';
const bot = new TelegramBot(TOKEN, {polling: true});
const CHAT_ID = "534196505"

program
  .command('message <message>')
  .description('Send a message to the Telegram bot')
  .action(async(message) => {
    await bot.sendMessage(CHAT_ID, message)
  process.exit(0);
  });

program
  .command('photo <photoPath>')
  .description('Send a photo to the Telegram bot')
  .action(async(photoPath) => {
    await bot.sendPhoto(CHAT_ID, photoPath);
  process.exit(0);
  });

program.parse(process.argv);

