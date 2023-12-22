import { Command } from 'commander';
import TelegramBot from 'node-telegram-bot-api';

const program = new Command();

const botToken = process.env.BOT_TOKEN.trim();
const chatId = process.env.CHAT_ID.trim();
// console.log(botToken.length, botToken.trim().length);

const bot = new TelegramBot(botToken, { polling: true });

program.version('0.0.1').description('CLI: TELEGRAM CONSOLE SENDER');

program
  .command('message <message>')
  .alias('m')
  .description('Send a message to Telegram bot')
  .action(catchError(sendMessage));

program.command('photo <path>').alias('p').description('Send a photo to Telegram bot').action(catchError(sendPhoto));

async function sendMessage(msg) {
  await bot.sendMessage(chatId, msg);

  console.log('Message sent successfully.');
}

async function sendPhoto(path) {
  await bot.sendPhoto(chatId, path);

  console.log('Photo sent successfully.');
}

/**
 * HELPERS
 */
function catchError(fn) {
  return async (...args) => {
    try {
      await fn(...args);

      process.exit(0);
    } catch (error) {
      console.error('Error:', error.message);

      process.exit(1);
    }
  };
}

/**
 * Start program
 */
program.parse(process.argv);
