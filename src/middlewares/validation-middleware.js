import Joi from 'joi'

import { BadRequest } from 'helpers'

const validateObject = (object = {}, label, schema, options) => {
  if (schema) {
    schema = Joi.isSchema(schema) ? schema : Joi.object(schema)
    const { error, value } = schema.validate(object, options)
    if (error) {
      throw new Error(`Invalid ${label} - ${error.message}`)
    }
  }
}

export const validationMiddleware = validationObj => (ctx, next) => {
  try {
    validateObject(ctx.headers, 'Headers', validationObj.headers, {
      allowUnknown: true
    })
    validateObject(ctx.params, 'URL Parameters', validationObj.params)
    validateObject(ctx.query, 'URL Query', validationObj.query)

    if (ctx.request.body) {
      validateObject(ctx.request.body, 'Request Body', validationObj.body)
    }

    return next()
  } catch (err) {
    throw BadRequest(err.message)
  }
}
