import * as Joi from "joi";

const registerUser = Joi.object({
  username: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
  bandRole: Joi.string()
    .required()
    .valid("Guitarist", "Pianist", "Accordionist", "Vocalist", "Drummer"),
});

const logInUser = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

export { registerUser, logInUser };
