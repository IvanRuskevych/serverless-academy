const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const botToken = process.env.BOT_TOKEN.trim();
const owmApiKey = process.env.OWM_API_KEY.trim();

const bot = new TelegramBot(botToken, { polling: true });

const constants = {
  city: "Kyiv",
  threeHours: "Every 3 hours",
  sixHours: "Every 6 hours",
};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const options = {
    reply_markup: {
      keyboard: [
        [
          {
            text: `Forecast in ${constants.city}`,
          },
        ],
      ],
    },
  };

  bot.sendMessage(chatId, "Select an option:", options);
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  if (msg.text === `Forecast in ${constants.city}`) {
    const options = {
      reply_markup: {
        keyboard: [
          [
            {
              text: constants.threeHours,
            },
            {
              text: constants.sixHours,
            },
          ],
        ],
      },
    };

    bot.sendMessage(chatId, "Select the forecast interval:", options);
  }

  if (msg.text === constants.threeHours || msg.text === constants.sixHours) {
    const interval = msg.text === constants.threeHours ? 1 : 2;

    try {
      const dataForecast = await getForecast(constants.city, interval);

      bot.sendMessage(chatId, dataForecast);
    } catch (error) {
      console.error(error);

      bot.sendMessage(
        chatId,
        "An error occurred while fetching the weather data."
      );
    }
  }
});

async function fetchWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${owmApiKey}&units=metric&lang=ua`;
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error("Failed to fetch weather data");
    }

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
}

async function getForecast(city, interval) {
  const { list: forecasts } = await fetchWeather(city);

  const filteredForecasts = forecasts.filter(
    (_, index) => index % interval === 0
  );

  let message = `Weather forecast for ${city} at intervals of ${
    interval * 3
  } hours:\n\n`;

  for (const forecast of filteredForecasts) {
    const temperature = forecast.main.temp;
    const pressure = forecast.main.pressure;
    const description = forecast.weather[0].description;
    const wind = forecast.wind.speed;
    const dateTime = forecast.dt_txt.slice(0, -3);

    message += `${dateTime}\nWeather: ${description}\nTemperature: ${temperature} °C\nPressure: ${pressure} hPa\nWind: ${wind} meter/sec\n\n`;
  }

  return message;
}
