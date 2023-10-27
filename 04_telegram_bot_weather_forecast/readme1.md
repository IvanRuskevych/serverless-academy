```js
// ...

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    "Please enter the name of the city for the weather forecast:"
  );
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const city = msg.text; // Отримайте введений користувачем текст як назву міста

  // Далі перевірте, чи введена назва міста є допустимою і виконайте запит до OpenWeatherMap API.
  // ...

  // Наприклад:
  if (city.length > 1) {
    const interval = msg.text === "At intervals of 3 hours" ? 3 : 6;

    try {
      const weatherData = await fetchWeather(city, interval);
      bot.sendMessage(chatId, weatherData);
    } catch (error) {
      console.error(error);
      bot.sendMessage(
        chatId,
        "An error occurred while fetching the weather data."
      );
    }
  } else {
    bot.sendMessage(
      chatId,
      "Invalid city name. Please enter a valid city name."
    );
  }
});

// ...
```
