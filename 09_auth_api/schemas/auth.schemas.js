const Joi = require("joi");

const authSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "The email must be a string.",
    "string.empty": "The email must not be empty.",
    "string.email": "The email must be valid",
    "any.required": "The email field is required.",
  }),

  password: Joi.string().required().messages({
    "string.base": "The password must be a string.",
    "any.required": "The password field is required.",
    "string.empty": "The password must not be empty.",
  }),
});

module.exports = { authSchema };
