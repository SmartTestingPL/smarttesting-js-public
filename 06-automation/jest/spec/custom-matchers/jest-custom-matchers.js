const { ObjectType } = require('./constants')

function isObject(obj) {
  return (typeof obj === "object" && obj !== null) || typeof obj === "function";
}

// test if [] is not an object and it'll get stringified to empty string :/
const stringify = (value) => {
  const casted = value.toString().trim()
  return casted.length ? casted : JSON.stringify(value, null, 2)
}

expect.extend({
  toBeAnObject(actual) {
    const pass = isObject(actual)
    const message = () => `${stringify(actual)} is ${pass ? 'actually' : 'not'} an object.`
    return {
      pass,
      message
    }
  }
})

expect.extend({
  toBeAPayment(actual) {
    const pass = isObject(actual) && actual[ObjectType] == 'PAYMENT'
    const message = () => `${stringify(actual)} is ${ pass ? 'actually': 'not'} a payment.`
    return {
      pass,
      message,
    };
  },
});
