const jwt = require("jsonwebtoken");
// const { SECRET_ACCESS_TOKEN, SECRET_REFRESH_TOKEN } = process.env;

function createToken(payload, secret) {
  return jwt.sign(payload, secret);
}

// const userId = uuid();

// const accessToken = createToken(userId, SECRET_ACCESS_TOKEN, "60m");
// const refreshToken = createToken(userId, SECRET_REFRESH_TOKEN, "");

module.exports = createToken;
