const net = require("node:net");

const { findCountryByIP } = require("../services");
const { wrapperTryCatch } = require("../utils");

async function getUserData(req, res) {
  const ip = req.header("x-forwarded-for");

  if (ip && net.isIPv4(ip)) {
    const country = findCountryByIP(ip);

    res.status(200).send(`User country is: ${country}; User IP is: ${ip}`);
  }
}

module.exports = { getUserData: wrapperTryCatch(getUserData) };
