import Joi from 'joi-browser'

export const registraionSchema = Joi.object().keys({
  name: Joi.string().label('name').required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(10).required(),
  confirmPassword: Joi.string().min(4).max(10).required()
})
