const { Person } = require('../../customer')

/**
 * Implementacja weryfikacji obrazującej problemy z testami, które nie weryfikują poprawnie implementacji.
 */
class SimpleVerification {

	/**
	 * Przykład problemu w testach: metoda z niezaimplementowaną logiką, dla której przechodzą źle napisane testy
 	 */
	passes(/** @type {Person} */ person) {
		// TODO
		// use someLogicResolvingToBoolean(person);
    return false;
	}

	someLogicResolvingToBoolean(/** @type {Person} */ person) {
		throw new Error("Not yet implemented!");
	}
}

module.exports = {
  SimpleVerification,
}
