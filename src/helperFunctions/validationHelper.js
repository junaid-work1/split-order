import Joi from 'joi-browser'
import { schema } from 'schemas/loginValidation'
import { registraionSchema } from 'schemas/registrationValidation'
import { foodModalSchema } from 'schemas/foodModalValidation'
import { restaurantSchema } from 'schemas/restaurantValidation'

export const validate = (email, password) => {
  const result = Joi.validate(
    {
      password,
      email
    },
    schema,
    {
      abortEarly: false
    }
  )
  if (result.error === null) return

  const errors = {}

  for (let item of result.error.details) {
    errors[item.path[0]] = item.message
  }
  return errors
}

export const resgistrationValidate = (name, password, email, confirmPassword) => {
  const result = Joi.validate(
    {
      name,
      password,
      email,
      confirmPassword
    },
    registraionSchema,
    {
      abortEarly: false
    }
  )
  if (result.error === null) return

  const errors = {}

  for (let item of result.error.details) {
    errors[item.path[0]] = item.message
  }
  return errors
}

export const foodModalValidate = (name, price) => {
  const result = Joi.validate(
    {
      name,
      price
    },
    foodModalSchema,
    {
      abortEarly: false
    }
  )
  if (result.error === null) return

  const errors = {}

  for (let item of result.error.details) {
    errors[item.path[0]] = item.message
  }
  return errors
}

export const Restaurantvalidate = name => {
  const result = Joi.validate(
    {
      name
    },
    restaurantSchema,
    {
      abortEarly: false
    }
  )
  if (result.error === null) return

  const errors = {}

  for (let item of result.error.details) {
    errors[item.path[0]] = item.message
  }
  return errors
}
