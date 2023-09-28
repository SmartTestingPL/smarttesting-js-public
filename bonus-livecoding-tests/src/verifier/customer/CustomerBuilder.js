const { v4: generateUUID } = require('uuid');

const { Customer, Person, GENDER, STATUS } = require("../../customer");
const { createDate } = require("../../lang/time");

/**
 * Przykład buildera do setupu testów.
 */
class CustomerBuilder {

  /** @type {string} */
  uuid = generateUUID();
  
  /** @type {string} */
  name = "Anna";
  
  /** @type {string} */
  surname = "Kowalska";
  
  /** @type {Date} */
  dateOfBirth = createDate(1978, 9, 12);
  
  /** @type {keyof GENDER} */
  gender = Person.GENDER.FEMALE;
  
  /** @type {string} */
  nationalIdentificationNumber = "78091211463";
  
  /** @type {keyof STATUS} */
  status = Person.STATUS.NOT_STUDENT;

  withUUID(/** @type {string} */ uuid) {
    this.uuid = uuid;
    return this;
  }

  withName(/** @type {string} */ name) {
    this.name = name;
    return this;
  }

  withSurname(/** @type {string} */ surname) {
    this.surname = surname;
    return this;
  }

  // TypeScript has "clean" function/method overrides, in JS - in short - we can do workarounds
  withDateOfBirthAsDate(/** @type {Date} */ dateOfBirth) {
    this.dateOfBirth = dateOfBirth;
    return this;
  }

  withDateOfBirth(/** @type {number} */ year, /** @type {number} */ month, /** @type {number} */ day) {
    this.dateOfBirth = createDate(year, month, day);
    return this;
  }

  withGender(/** @type {keyof GENDER} */ gender) {
    this.gender = gender;
    return this;
  }

  withNationalIdentificationNumber(/** @type {string} */ nationalIdentificationNumber) {
    this.nationalIdentificationNumber = nationalIdentificationNumber;
    return this;
  }

  withStatus(/** @type {keyof STATUS} */ status) {
    this.status = status;
    return this;
  }

  build() {
    const { uuid, name, surname, dateOfBirth, gender, nationalIdentificationNumber } = this
    const customer = new Customer({
      uuid,
      person: new Person({
        name,
        surname, 
        dateOfBirth, 
        gender,
        nationalIdentificationNumber
      })
    })
    if (this.status === Person.STATUS.STUDENT) {
      customer.student();
    }
    return customer;
  }
}

module.exports = {
  CustomerBuilder,
}
