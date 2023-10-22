const Joi = require('@hapi/joi')
const {
  emailSchema,
  employeeSchema,
  employeeCollectionSchema,
} = require('./schema')

const { customMatchers } = require('../custom-matchers/jasmine-custom-matchers')

describe('Joi Schemas', () => {

  beforeEach(function () {
    jasmine.addMatchers(customMatchers)
  })

  it('should validate emails', () => {
    const email = 'tomasz@ducin.it'
    // manually:
    const { error, value } = emailSchema.validate(email);
    expect(error).toBeUndefined()

    { // this one fails
      const invalidEmail = 'tomasz@ducin'
      const { error, value } = emailSchema.validate(invalidEmail);
      expect(error).not.toBeUndefined()
    }
  })
  
  it('should validate employee objects', () => {
    const employee = {
      id: 'dfgh-y453-hty4-wf7f',
      firstName: 'John',
      lastName: 'Lennon',
      title: 'The Beatles Guitarist & Lead Vocals',
      email: 'jl@beatles.com'
    }
    
    // with custom matchers:
    expect(employee).not.toMatchJoiSchema(employeeSchema)
    // custom joi validation option: allowUnknown for excessive params
    expect(employee).toMatchJoiSchema(employeeSchema, true)
  })

  it('should validate collections of employee objects', () => {
    const employees = [{
      firstName: 'John',
      lastName: 'Lennon',
      title: 'The Beatles Guitarist & Lead Vocals',
      email: 'jl@beatles.com'
    }, {
      firstName: 'Paul',
      lastName: 'McCartney',
      title: 'The Beatles Lead Guitarist & Vocals',
      email: 'pmc@beatles.com'
    }]

    expect(employees).toMatchJoiSchema(employeeCollectionSchema)
  })

})
