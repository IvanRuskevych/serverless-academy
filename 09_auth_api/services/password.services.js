const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const validatePassword = async (passwordReq, passwordDb) => {
  return await bcrypt.compare(passwordReq, passwordDb);
};

module.exports = { hashPassword, validatePassword };
