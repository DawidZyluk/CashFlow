import Joi from "joi";

export const resetRequestSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
});
