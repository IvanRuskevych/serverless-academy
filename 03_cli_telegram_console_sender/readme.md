# TASK 3. "CLI: TELEGRAM CONSOLE SENDER"

## Insert your telegram bot TOKEN and CHAT_ID prior to start

Your task: create a simple telegram bot that can act as notes or notepad when you need to save something urgently from the console.

## Tools and libraries you can use

commander - this library helps you organize your app with commands and command-specific options.
node-telegram-bot-api - just a wrapper on top of Telegram Bot API.

## Here is the list of commands that your app should support

### Send a message:

- Run: **node index.js -m** or **--message 'Your message'**

The result of executing this command is the appearance of your message in your Telegram bot. After it has been executed, the CLI terminates the process itself to allow you to enter the next command.

### Send a photo:

- Run: **node index.js -p** or **--photo '/path/to/the/photo.png'**

The result of this command is a photo sent to the Telegram bot from your PC. After it has been executed, the CLI terminates the process itself to allow you to enter the next command.

**NOTE:** Take care of your users beforehand - make sure you added descriptions about the commands and their options. The user should be able to see it using help command or --help argument.

## To run application:

- Install the required dependencies by running `npm install`.
- You have to get your `BOT_TOKEN` and `CHAT_ID` and insert them to .env to use bot
- Run from terminal `$ env $(cat .env | xargs) node index.js` to start cli

## Bot commands

- /start - to start using telegram bot
