const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

const { ipConverter } = require("../utils");

const countriesIPDataPath = path.join(__dirname, "../data.csv");
const readStream = fs.createReadStream(countriesIPDataPath);
const countriesIPData = [];

/**
 * Convert data from csv to array of objects
 */
readStream
  .on("error", (error) => {
    console.error(error.message);
  })
  .pipe(csv(["from", "to", "countryShort", "countryName"]))
  .on("data", (data) => {
    const ipData = {
      from: data.from,
      to: data.to,
      countryShort: data.countryShort,
      countryName: data.countryName,
    };

    countriesIPData.push(ipData);
  });

/**
 * Find country by IP address
 */
const findCountryByIP = (ip) => {
  const numericIP = ipConverter(ip);

  const countryIPData = countriesIPData.find(
    (ipData) => numericIP >= ipData.from && numericIP <= ipData.to
  );

  if (countryIPData) {
    return countryIPData.countryName;
  } else {
    return console.log(`Database do not include this IP address: ${ip}`);
  }
};

module.exports = { findCountryByIP };
