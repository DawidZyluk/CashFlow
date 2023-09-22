import Joi from "joi";

export const addAccountSchema = Joi.object({
  accountName: Joi.string().required(),
  accountNumber: Joi.string().allow(null, ''),
  color: Joi.string().required(),
  accountType: Joi.string().required(),
  balance: Joi.number().required(),
});
