const { Person } = require("./Person");
const { CustomerVerificationResult } = require("./CustomerVerificationResult");

/**
 * Weryfikacja czy klient jest oszustem czy nie. Przechodzi po
 * różnych implementacjach weryfikacji i jeśli, przy którejś okaże się,
 * że użytkownik jest oszustem, wówczas odpowiedni rezultat zostanie zwrócony.
 */
class CustomerVerifier {

	verifications;

	constructor(verifications) {
		this.verifications = [...verifications];
	}

	verify(/** @type {Person} */ person) {
		console.log("ORIGINAL IMPL")
		if (this.verifications.every(verification => verification.passes(person))) {
			return CustomerVerificationResult.passed(person.uuid);
		}
		return CustomerVerificationResult.failed(person.uuid);
	}
}

module.exports = {
  CustomerVerifier,
}
