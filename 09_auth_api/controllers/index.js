const { signUp, signIn } = require("./auth.controllers");
const { getCurrentUser } = require("./user.controllers");

module.exports = { signUp, signIn, getCurrentUser };
