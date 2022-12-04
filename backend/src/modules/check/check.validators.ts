import Joi from "joi";
import { generateValidationMiddleware } from "../../utilities/joi";

const createCheckSchema = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().required(),
  path: Joi.string(),
  port: Joi.number(),
  timeout: Joi.number(),
  interval: Joi.number(),
  webhook: Joi.string(),
  headers: Joi.array().items(
    Joi.object({
      key: Joi.string().required(),
      value: Joi.string().required(),
    })
  ),
  authentication: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
  tags: Joi.array().items(Joi.string()),
  ignoreSSL: Joi.boolean(),
}).options({
  allowUnknown: true,
  abortEarly: false,
});

const checkValidators = {
  create: generateValidationMiddleware(createCheckSchema),
};

export { checkValidators };
