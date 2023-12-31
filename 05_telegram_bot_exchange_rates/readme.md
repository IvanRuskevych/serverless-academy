# TASK 5. TELEGRAM BOT: EXCHANGE RATES

In this task we will create a bot for getting the exchange rate. You can use a previously created bot, or create a new one.

## Bot requirements

- The bot must have two buttons that will allow you to find out the USD and EUR exchange rates. Use PrivatBank and Monobank APIs for that.
- Keep in mind that Monobank does not allow you to make requests more than once every 60 seconds, while your bot may be used by dozens of people. Implement this logic, so the bot will not return an error, but will provide actual exchange rates. For example, you can cache results: take a look at node-cache library.

## To run application:

- Install the required dependencies by running `npm install`.
- You have to get your `BOT_TOKEN` and `OWM_API_KEY` and insert them to .env to use bot
- Run from terminal `$ env $(cat .env | xargs) node index.js` to start cli

## Bot commands

- /start - to start using telegram bot
