const { Person } = require('../../../customer')

/**
 * Weryfikacja wieku osoby wnioskującej o udzielenie pożyczki.
 */
class AgeVerification {
	passes(/** @type {Person} */ person) {
		if (person.age() <= 0) {
			throw new TypeError("Age cannot be negative.");
		}
		return person.age() >= 18 && person.age() <= 99;
	}
}

module.exports = {
  AgeVerification,
}
