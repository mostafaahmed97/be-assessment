import Joi from "joi";
import { generateValidationMiddleware } from "../../utilities/joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
}).options({
  allowUnknown: true,
  abortEarly: false,
});

const signupSchema = Joi.object({
  username: Joi.string().required().min(4),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
}).options({
  allowUnknown: true,
  abortEarly: false,
});

const authValidators = {
  signup: generateValidationMiddleware(signupSchema),
  login: generateValidationMiddleware(loginSchema),
};

export { authValidators };
