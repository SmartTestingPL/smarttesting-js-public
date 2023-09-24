const { v4: uuid } = require('uuid')
const { Customer } = require("./Customer")
const { Person, GENDER } = require("./Person")
const { now } = require("./lang/time")

const createMockCustomer = (nationalIdentificationNumber) => {
  const person = new Person({
    name: '',
    surname: '',
    dateOfBirth: now(),
    nationalIdentificationNumber,
    gender: GENDER.MALE
  });

  const customer = new Customer({
    uuid: uuid(),
    person
  });

  return customer;
}

module.exports = {
  createMockCustomer
}
