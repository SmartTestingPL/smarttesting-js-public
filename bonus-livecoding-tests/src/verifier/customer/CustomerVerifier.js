const { Customer } = require("../../customer");
const { CustomerVerificationResult } = require("./CustomerVerificationResult");

/**
 * Weryfikacja czy klient jest oszustem czy nie. Przechodzi po
 * różnych implementacjach weryfikacji i zwraca zagregowany wynik.
 *
 * Klasa używa obiektu-wrappera otaczającego metodę statyczną realizującą operacje bazodanowe.
 * Nie polecamy robienia czegoś takiego w metodzie statycznej, ale tu pokazujemy jak to obejść i przetestować
 * jeżeli z jakiegoś powodu nie da się tego zmienić (np. metoda statyczna jest dostarczana przez kogoś innego).
 */
class CustomerVerifier {

	verifications;

	constructor(verifications) {
		this.verifications = [...verifications];
	}

	verify(/** @type {Customer} */ customer) {
		if (this.verifications.every(verification => verification.passes(customer.person))) {
			return CustomerVerificationResult.passed(customer.uuid);
		}
		return CustomerVerificationResult.failed(customer.uuid);
	}
}

module.exports = {
  CustomerVerifier,
}
