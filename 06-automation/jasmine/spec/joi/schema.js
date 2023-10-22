const Joi = require('@hapi/joi')

const emailSchema = Joi.string().email()

const employeeSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  title: Joi.string(),
  email: emailSchema,
})

const employeeCollectionSchema = Joi.array().items(employeeSchema)

module.exports = {
  emailSchema,
  employeeSchema,
  employeeCollectionSchema,
}
