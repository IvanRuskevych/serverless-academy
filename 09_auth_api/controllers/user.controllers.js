const { wrapperTryCatch } = require("../utils");

/**
 * Getting current user
 */
const getCurrentUser = async (req, res) => {
  const { id, email } = req.user;

  res.status(200).json({
    success: true,
    data: {
      id,
      email,
    },
  });
};

module.exports = { getCurrentUser: wrapperTryCatch(getCurrentUser) };
