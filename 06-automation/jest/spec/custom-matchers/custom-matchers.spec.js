require('./jest-custom-matchers')
const { ObjectType } = require('./constants')

const examplePayments = [{
  [ObjectType]: 'PAYMENT',
  from: "Greg",
  to: "Mike",
  amount: 234.90,
}, {
  [ObjectType]: 'PAYMENT',
  from: "Laura",
  to: "Chris",
  amount: 8123.75,
}]

describe('JEST custom matchers', () => {
  it('is an object', () => {
    expect({}).toBeAnObject()
    expect([]).toBeAnObject()
    expect(5).not.toBeAnObject()
    expect(new Number(5)).toBeAnObject()
  })

  it('is a payment', () => {
    examplePayments.forEach(
      p => expect(p).toBeAPayment()
    )

    ;[{}, [], 5, new Number(5)].forEach(
      p => expect(p).not.toBeAPayment()
    )
  })
})
