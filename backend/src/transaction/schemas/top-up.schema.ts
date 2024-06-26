import Joi from "@hapi/joi";

export const topUpSchema = Joi.object({
  paymentProvider: Joi.string().required(),
  amount: Joi.number().required(),
});
