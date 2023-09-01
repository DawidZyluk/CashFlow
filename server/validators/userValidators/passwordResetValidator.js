import Joi from "joi";

export const passwordResetSchema = Joi.object({
  userId: Joi.string().min(1).required(),
  token: Joi.string().required(),
  password: Joi.string().min(3).required(),
  confirmPassword: Joi.string()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
});
