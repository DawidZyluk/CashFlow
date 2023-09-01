import Joi from "joi";

export const updateSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(3).allow(null, ''),
  confirmPassword: Joi.when("password", {
    is: Joi.string().min(3).allow(null, ''),
    then: Joi.equal(Joi.ref("password"))
      .label("Confirm password")
      .messages({ "any.only": "{{#label}} does not match" })
      .required(),
    otherwise: Joi.equal(Joi.ref("password"))
      .label("Confirm password")
      .messages({ "any.only": "{{#label}} does not match" }),
  }),
});
