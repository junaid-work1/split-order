import Joi from 'joi-browser'

export const restaurantSchema = Joi.object().keys({
  name: Joi.string().label('name').required()
})
