const { Person } = require('./Person')

/**
 * Weryfikacja po wieku. Osoba w odpowiednim wieku zostanie
 * zweryfikowana pozytywnie.
 */
class AgeVerification {
	passes(/** @type {Person} */ person) {
		if (person.age() < 0) {
			throw new TypeError("Age cannot be negative.");
		}
		return person.age() >= 18 && person.age() <= 99;
	}
}

module.exports = {
  AgeVerification,
}
