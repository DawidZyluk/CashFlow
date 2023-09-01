import Joi from "joi";

export const addAccountSchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().required(),
  accountNumber: Joi.string().allow(null, ''),
  accountType: Joi.string().required(),
  initialBalance: Joi.number().required(),
});
