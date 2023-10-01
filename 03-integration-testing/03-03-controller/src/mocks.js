const { v4: uuid } = require('uuid')
const { Person, GENDER } = require("./Person")
const { now } = require("./lang/time");

const createMockPerson = () => {
  const person = new Person({
    uuid: uuid(),
    name: '',
    surname: '',
    dateOfBirth: now(),
    nationalIdentificationNumber: '',
    gender: GENDER.MALE
  });

  return person;
}

module.exports = {
  createMockPerson,
}
