import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(3).required(),
  confirmPassword: Joi.string()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
});
