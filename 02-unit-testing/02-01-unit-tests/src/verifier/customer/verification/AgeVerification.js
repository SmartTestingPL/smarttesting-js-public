const { Person } = require('../../../customer');
const { EventEmitter } = require('../../EventEmitter');
const { VerificationEvent } = require('../../VerificationEvent');

/**
 * Weryfikacja wieku osoby wnioskującej o udzielenie pożyczki.
 */
class AgeVerification {
	constructor(/** @type {EventEmitter} */ eventEmitter) {
		this.eventEmitter = eventEmitter;
	}

	passes(/** @type {Person} */ person) {
		if (person.age() <= 0) {
			throw new TypeError("Age cannot be negative.");
		}
		const passes = person.age() >= 18 && person.age() <= 99;
		this.eventEmitter.emit(new VerificationEvent(passes));
		return passes;
	}
}

module.exports = {
  AgeVerification,
}
