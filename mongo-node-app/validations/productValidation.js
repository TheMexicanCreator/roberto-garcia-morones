const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().min(0).optional(),
});

module.exports = productSchema;
