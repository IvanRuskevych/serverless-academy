const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const NodeCache = require("node-cache");

const botToken = process.env.BOT_TOKEN.trim();
const owmApiKey = process.env.OWM_API_KEY.trim();

/**
 * Before start make your choice of bankApiUrl (lines 11 or 12)
 */
// const bankApiUrl = "https://api.monobank.ua/bank/currency";
const bankApiUrl =
  "https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11";

const bot = new TelegramBot(botToken, { polling: true });
const cache = new NodeCache({ stdTTL: 65 });

const constants = {
  city: "Kyiv",
  forecast: "/Погода",
  threeHours: "Кожні 3 години",
  sixHours: "Кожні 6 години",
  exchangeRate: "/Курс валют",
  usdRate: "USD",
  eurRate: "EUR",
  prevMenu: "Попередне меню",
};

/**
 * Bot options
 */
const botOptionsStart = {
  reply_markup: {
    keyboard: [
      [
        {
          text: constants.forecast,
        },
      ],
      [
        {
          text: constants.exchangeRate,
        },
      ],
    ],
  },
};

const botOptionsRate = {
  reply_markup: {
    keyboard: [
      [
        {
          text: constants.usdRate,
        },
        {
          text: constants.eurRate,
        },
      ],
      [{ text: constants.prevMenu }],
    ],
  },
};

const botOptionsForecast = {
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
      [{ text: constants.prevMenu }],
    ],
  },
};

/**
 * Start
 * Before start make your choice of bankApiUrl (lines 11 or 12)
 */
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Select an option:", botOptionsStart);
});

/**
 * Listening messages
 */
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  // Messages from "Forecast"
  if (msg.text === constants.forecast) {
    bot.sendMessage(chatId, "Select an interval:", botOptionsForecast);
  }

  // Messages from forecast interval
  else if (
    msg.text === constants.threeHours ||
    msg.text === constants.sixHours
  ) {
    const interval = msg.text === constants.threeHours ? 1 : 2;
    const dataForecast = await getForecast(constants.city, interval);

    bot.sendMessage(chatId, dataForecast);
  }

  // Messages from "Exchange rate"
  else if (msg.text === constants.exchangeRate) {
    bot.sendMessage(chatId, "Select a currency :", botOptionsRate);
  }

  // Messages from "USD"
  else if (msg.text === constants.usdRate) {
    const usdRate = await getExchangeRate(bankApiUrl, "USD");

    bot.sendMessage(chatId, usdRate);
  }

  // Messages from "EUR"
  else if (msg.text === constants.eurRate) {
    const eurRate = await getExchangeRate(bankApiUrl, "EUR");

    bot.sendMessage(chatId, eurRate);
  } else if (msg.text === constants.prevMenu) {
    bot.sendMessage(chatId, "Select an option:", botOptionsStart);
  }
});

/**
 * Getting weather forecast
 */
async function fetchWeatherData(city) {
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
  const { list: forecasts } = await fetchWeatherData(city);

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

/**
 * Getting Exchange Rate
 */
async function getExchangeRate(apiUrl, currency) {
  const cachedRate = cache.get(currency); // get data from cash
  let rateMessage = `Exchange Rate for ${currency}:\n`;

  if (cachedRate) {
    return cachedRate;
  }
  // if cachedRate = undefined => get data
  const data = await fetchExchangeData(apiUrl);

  for (const rate of data) {
    if (isPrivatbankAPI(rate)) {
      if (rate.ccy === currency) {
        rateMessage += `${rate.base_ccy} to ${rate.ccy}: ${rate.buy.slice(
          0,
          -3
        )} / ${rate.sale.slice(0, -3)}`;
        break;
      }
    } else if (isMonobankAPI(rate)) {
      if (rate.currencyCodeA === 840) {
        rateMessage += `UHA to USD: ${rate.rateBuy} / ${rate.rateSell}`;
        break;
      } else if (rate.currencyCodeA === 978) {
        rateMessage += `UHA to EUR: ${rate.rateBuy} / ${rate.rateSell}`;
        break;
      }
    }
  }

  // Cache the rate for 60 seconds
  cache.set(currency, rateMessage, 60);

  return rateMessage;
}

async function fetchExchangeData(url) {
  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error("Failed to fetch exchange rate data");
    }

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

function isPrivatbankAPI(data) {
  return data?.ccy !== undefined;
}

function isMonobankAPI(data) {
  return data?.currencyCodeA !== undefined;
}
