import Joi from "joi";

export const addEntrySchema = Joi.object({
  accountId: Joi.string().min(1).required(),
  date: Joi.string().required(),
  value: Joi.number().required(),
  category: Joi.string().required(),
  note: Joi.string().allow(null, ''),
});
