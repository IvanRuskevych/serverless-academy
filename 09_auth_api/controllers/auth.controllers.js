const { v4: uuid } = require("uuid");

const client = require("../db");

const { hashPassword, validatePassword, createToken } = require("../services");
const { RequestError, wrapperTryCatch } = require("../utils");

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

  if (userExists.rows[0]) throw RequestError(409, "Email in use");

  const userId = uuid();

  const hashedPassword = await hashPassword(password);
  //   console.log("🚀  hashedPassword:", hashedPassword.length);
  const accessToken = createToken(userId, SECRET_ACCESS_TOKEN);
  const refreshToken = createToken(userId, SECRET_REFRESH_TOKEN);
  const newUser = {
    success: true,
    data: {
      id: userId,
      accessToken,
      refreshToken,
    },
  };

  await client.query(
    `INSERT INTO users (id, email, password, refresh_token) values ($1, $2, $3, $4) RETURNING *`,
    [userId, email, hashedPassword, refreshToken]
  );

  return res.status(201).json(newUser);
};

/**
 * Login
 */
const signIn = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await client.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  if (!userExists.rows[0]) throw RequestError(404, "User not found");

  const isValidPassword = await validatePassword(
    password,
    userExists.rows[0].password
  );

  if (!isValidPassword) throw RequestError(401, "Password is wrong");

  const { id, refresh_token } = userExists.rows[0];
  const accessToken = createToken(id, SECRET_ACCESS_TOKEN);
  const user = {
    success: true,
    data: {
      id,
      accessToken,
      refreshToken: refresh_token,
    },
  };

  return res.status(200).json(user);
};

module.exports = {
  signUp: wrapperTryCatch(signUp),
  signIn: wrapperTryCatch(signIn),
};
