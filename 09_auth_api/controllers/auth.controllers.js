const { v4: uuid } = require("uuid");

const client = require("../db");
const createToken = require("../services/token.services");
const { SECRET_ACCESS_TOKEN, SECRET_REFRESH_TOKEN } = process.env;

/**
 * Registration
 */

const signUp = async (req, res) => {
  const { email, password } = req.body;

  const userId = uuid();
  const accessToken = createToken(userId, SECRET_ACCESS_TOKEN);
  const refreshToken = createToken(userId, SECRET_REFRESH_TOKEN);
  const newUser = {
    id: userId,
    accessToken,
    refreshToken,
  };

  await client.query(
    `INSERT INTO users (id, email, password, refreshToken) values ($1, $2, $3, $4) RETURNING *`,
    [userId, email, password, refreshToken]
  );

  return res.status(201).json(newUser);
};

module.exports = {
  signUp,
};
