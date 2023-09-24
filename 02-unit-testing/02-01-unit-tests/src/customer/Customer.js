const { Person } = require('./Person')

/**
 * Klient. Klasa opakowująca osobę do zweryfikowania.
 */
class Customer {
  /** @type {string} */
  uuid

  /** @type {Person} */
  person

  constructor({ uuid, person }){
    this.uuid = uuid
    this.person = person
  }

  isStudent(){
    return this.person.isStudent()
  }

  student(){
    this.person.student()
  }
}

module.exports = {
  Customer,
}
