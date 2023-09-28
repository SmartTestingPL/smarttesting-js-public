const { v4: uuid } = require('uuid')

const { Customer } = require("../customer/Customer");
const { Person, GENDER } = require('../customer/Person');

// Funkcja zawierająca setup klientów typu STUDENT na potrzeby testów
const exampleStudent = () => {
  const customer = new Customer({
    uuid: uuid(),
    person: new Person({
      name: "John",
      surname: "Smith",
      dateOfBirth: new Date(1996, 8, 28),
      gender: GENDER.MALE,
      nationalIdentificationNumber: "96082812079"
    })
  })
  customer.student()
  return customer
}

module.exports = {
  exampleStudent,
}
