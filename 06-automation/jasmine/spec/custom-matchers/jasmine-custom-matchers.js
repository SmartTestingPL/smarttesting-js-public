const { ObjectType } = require('./constants')

function isObject(obj) {
  return (typeof obj === "object" && obj !== null) || typeof obj === "function";
}

const stringify = (value) => JSON.stringify(value, null, 4)

// based on jasmine 3.4
const customMatchers = {
  toBeAnObject(util, customEqualityTesters) {
    return {
      compare: (actual, expected) => {
        const pass = isObject(actual)
        const message = () => `${stringify(actual)} is ${pass ? 'actually' : 'not'} an object.`
        return {
          pass,
          message
        }
      }
    }
  },
  toBeAPayment(util, customEqualityTesters) {
    return {
      compare: (actual, expected) => {
        const pass = isObject(actual) && actual[ObjectType] == 'PAYMENT'
        const message = () => `${stringify(actual)} is ${pass ? 'actually' : 'not'} a payment.`
        return {
          pass,
          message,
        };
      }
    }
  },
  toMatchJoiSchema(util, customEqualityTesters) {
    const Joi = require('@hapi/joi')
    return {
      compare: (actual, schema, allowUnknown = false) => {
        const { error, value } = schema.validate(actual, {
          allowUnknown
        })
        const pass = error === undefined
        const message = () => `${stringify(actual)} ${pass ? 'matches' : 'doesn\'t match'} the schema: ${error}`
        return {
          pass,
          message,
        };
      }
    }
  },
  toMatchJSONSchema(util, customEqualityTesters) {
    const Ajv = require('ajv')
    const ajv = new Ajv()
    const addFormats = require("ajv-formats")
    addFormats(ajv)

    return {
      compare: (actual, { additionalProperties, ...originalSchema }, allowAdditionalProperties = false) => {
        // detaches the original additionalProperties flag from the root level
        // easy to use, because we don't have to manipulate the original schema in the test
        // but doesn't allow to do the same with nested additionalProperties
        // not a perfect solution...
        const schema = {
          ...originalSchema,
          additionalProperties: allowAdditionalProperties
        }
        const valid = ajv.validate(schema, actual)
        const pass = valid // ajv.errors === null
        const message = () => `Object\n${stringify(actual)}\n` + (
          pass
            ? `does match with:\n${stringify(schema)}`
            : `doesn't match with:\n${stringify(schema)}\nerror thrown:\n${stringify(ajv.errors)}`
        )
        console.log({ pass, valid, actual, allowAdditionalProperties, originalSchema, additionalProperties, schema, message: message(),  })
        return {
          pass,
          message,
        };
      }
    }
  }
}

module.exports = {
  customMatchers,
}
