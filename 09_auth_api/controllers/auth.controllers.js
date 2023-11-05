const { v4: uuid } = require("uuid");

const client = require("../db");

const { hashPassword } = require("../services/password.services");
const { RequestError } = require("../utils/requestError");
const { createToken } = require("../services/token.services");
const { wrapperTryCatch } = require("../utils/wrapperTryCatch");
const { SECRET_ACCESS_TOKEN, SECRET_REFRESH_TOKEN } = process.env;

/**
 * Registration
 */

const signUp = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await client.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  if (userExists.rows[0]) {
    throw RequestError(409, "Email in use");
  }

  const userId = uuid();

  const hashedPassword = await hashPassword(password);
  //   console.log("🚀  hashedPassword:", hashedPassword.length);
  const accessToken = createToken(userId, SECRET_ACCESS_TOKEN);
  const refreshToken = createToken(userId, SECRET_REFRESH_TOKEN);
  const newUser = {
    id: userId,
    accessToken,
    refreshToken,
  };

  await client.query(
    `INSERT INTO users (id, email, password, refreshToken) values ($1, $2, $3, $4) RETURNING *`,
    [userId, email, hashedPassword, refreshToken]
  );

  return res.status(201).json(newUser);
};

module.exports = {
  signUp: wrapperTryCatch(signUp),
};
