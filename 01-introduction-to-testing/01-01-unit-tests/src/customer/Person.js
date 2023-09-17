// no native enums in JS, but this will do the job

const GENDER = Object.freeze({
  MALE: "MALE",
  FEMALE: "FEMALE",
})

const STATUS = Object.freeze({
  STUDENT: "STUDENT",
  NOT_STUDENT: "NOT_STUDENT",
})

/**
 * Reprezentuje osobę do zweryfikowania.
 */
class Person {
  /** @type {string} */
  name

  /** @type {string} */
  surname

  /** @type {Date} */
  dateOfBirth

  /** @type {keyof GENDER} */
  gender

  /** @type {string} */
  nationalIdentificationNumber

  /** @type {keyof STATUS} */
  status

  constructor({ name, surname, dateOfBirth, gender, nationalIdentificationNumber }){
    this.name = name
    this.surname = surname
    this.dateOfBirth = dateOfBirth
    this.gender = gender
    this.nationalIdentificationNumber = nationalIdentificationNumber
  }

  isStudent(){
    return this.status === STATUS.STUDENT
  }

  student(){
    this.status = STATUS.STUDENT
  }

  age(){
		const currentDate = Date.now();
		if (this.dateOfBirth != null) {
      let date1 = new Date(this.dateOfBirth);
      let date2 = new Date(currentDate);
      return date2.getFullYear() - date1.getFullYear();
		} else {
			throw new TypeError("Date of birth cannot be null");
		}
	}
}

module.exports = {
  GENDER,
  STATUS,
  Person,
}
