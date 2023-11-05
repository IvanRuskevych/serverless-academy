const { RequestError } = require("../utils/requestError");
const jwt = require("jsonwebtoken");
const client = require("../db");

const { SECRET_ACCESS_TOKEN } = process.env;

/**
 *  Authenticate user by access token
 */
const authenticate = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") next(RequestError(401, "Not authorized"));

  try {
    const id = jwt.verify(token, SECRET_ACCESS_TOKEN);

    const user = await client.query(`SELECT * FROM users WHERE id = $1`, [id]);

    if (!user.rows[0]) next(RequestError(401, "Not authorized"));

    req.user = user.rows[0];

    next();
  } catch (error) {
    next(RequestError(401, "Not authorized"));
  }
};

module.exports = { authenticate };
