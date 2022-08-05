import Joi from 'joi-browser'

export const foodModalSchema = Joi.object().keys({
  name: Joi.string().label('name').required(),
  price: Joi.string().label('price').required()
})
