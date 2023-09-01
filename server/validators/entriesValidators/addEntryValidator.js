import Joi from "joi";

export const addEntrySchema = Joi.object({
  userId: Joi.string().min(1).required(),
  label: Joi.string().required(),
  value: Joi.number().required(),
  category: Joi.string().required(),
  account: Joi.string().required(),
});
