const dateFormat = require('dateformat');

const { Person, GENDER } = require('../../../customer');
const { EventEmitter } = require('../../EventEmitter');
const { VerificationEvent } = require('../../VerificationEvent');

/**
 * Weryfikacja poprawności numeru PESEL.
 * Zob. https://pl.wikipedia.org/wiki/PESEL#Cyfra_kontrolna_i_sprawdzanie_poprawno.C5.9Bci_numeru
 */
class IdentificationNumberVerification {
	constructor(/** @type {EventEmitter} */ eventEmitter) {
		this.eventEmitter = eventEmitter;
	}

	passes(/** @type {Person} */ person) {
		const passes = this.genderMatchesIdentificationNumber(person)
				&& this.identificationNumberStartsWithDateOfBirth(person)
				&& this.identificationNumberWeightIsCorrect(person)
		this.eventEmitter.emit(new VerificationEvent(passes));
		return passes;
	}

	genderMatchesIdentificationNumber(/** @type {Person} */ person) {
    if(parseInt(person.nationalIdentificationNumber.substring(9, 10)) % 2 == 0){
      return person.gender === GENDER.FEMALE
		} else {
			return person.gender === GENDER.MALE
		}
	}

	identificationNumberStartsWithDateOfBirth(/** @type {Person} */ person) {
		let dateOfBirthString = dateFormat(person.dateOfBirth, 'yymmdd')

		if (dateOfBirthString[0] == '0') {
			let monthNum = parseInt(dateOfBirthString.substring(2, 4))
			monthNum += 20
			dateOfBirthString = dateOfBirthString
        .substring(0, 2) + monthNum + dateOfBirthString.substring(4, 6)
		}
		return dateOfBirthString === person.nationalIdentificationNumber.substring(0, 6)
	}

	identificationNumberWeightIsCorrect(/** @type {Person} */ person) {
		const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]

		if (person.nationalIdentificationNumber.length != 11) {
			return false
		}

		let weightSum = 0
		for (let i = 0; i < 10; i++) {
			weightSum += parseInt(person.nationalIdentificationNumber
					.substring(i, i + 1)) * weights[i]
		}

		const actualSum = (10 - weightSum % 10) % 10

		const checkSum = parseInt(person.nationalIdentificationNumber.substring(10, 11))

		return actualSum == checkSum
	}
}

module.exports = {
  IdentificationNumberVerification,
}
