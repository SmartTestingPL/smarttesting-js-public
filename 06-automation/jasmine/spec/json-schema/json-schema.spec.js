const Ajv = require('ajv')
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

const {
  emailSchema,
  employeeSchema,
  employeeCollectionSchema,
} = require('./schema')

const { customMatchers } = require('../custom-matchers/jasmine-custom-matchers')

describe('JSON Schemas w/ajv', () => {

  beforeEach(function () {
    jasmine.addMatchers(customMatchers)
  })

  fit('should validate emails', () => {
    const email = 'tomasz@ducin.it'
    // manually:
    const valid = ajv.validate(emailSchema, email)
    //   below assert true/false and null/not-null which is ok when passes
    //   but gives no clue, if it fails!
    // expect(valid).toBeTruthy()
    // expect(ajv.errors).toBeNull()
    //   this fails because of the actual error message, giving the dev more details
    if (!valid) fail(ajv.errors)
    //   custom matcher is the best solution here

    { // this one SHOULD FAIL ('tomasz@ducin' is NOT an email)
      const invalidEmail = 'tomasz@ducin'
      const valid = ajv.validate(emailSchema, invalidEmail)
      // expect(valid).not.toBeTruthy()
      // expect(ajv.errors).not.toBeNull()
      // ! because reversed
      if (ajv.errors) fail(ajv.errors)
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
    expect(employee).not.toMatchJSONSchema(employeeSchema)
    expect(employee).toMatchJSONSchema(employeeSchema, true)
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

    expect(employees).toMatchJSONSchema(employeeCollectionSchema)
    const employeesWithoutEmail = employees.map(({ e, email }) => ({ ...e }))
    expect(employeesWithoutEmail).not.toMatchJSONSchema(employeeCollectionSchema)
  })

})
