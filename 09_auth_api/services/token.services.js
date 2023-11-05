const jwt = require("jsonwebtoken");

function createToken(payload, secret) {
  return jwt.sign(payload, secret);
}

module.exports = { createToken };
