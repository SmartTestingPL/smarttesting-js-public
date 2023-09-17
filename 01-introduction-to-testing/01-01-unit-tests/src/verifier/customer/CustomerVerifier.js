const { Customer } = require('../../customer')
const { CustomerVerificationResult } = require('./CustomerVerificationResult')
const { VeryBadVerificationServiceWrapper } = require('./VeryBadVerificationServiceWrapper')

/**
 * Weryfikacja czy klient jest oszustem czy nie. Przechodzi po
 * różnych implementacjach weryfikacji i zwraca zagregowany wynik.
 *
 * Klasa używa obiektu-wrappera otaczającego metodę statyczną realizującą operacje bazodanowe.
 * Nie polecamy robienia czegoś takiego w metodzie statycznej, ale tu pokazujemy jak to obejść i przetestować
 * jeżeli z jakiegoś powodu nie da się tego zmienić (np. metoda statyczna jest dostarczana przez kogoś innego).
 */
class CustomerVerifier {

  /** @type {Set} */
	verifications

	BIKVerificationService

  /** @type {VeryBadVerificationServiceWrapper} */
	serviceWrapper

  // tu dla odmiany (w porównaniu do inncyh konstruktorów) przekazujemy parametry pozycyjnie
  // tj. po przecinku i bez wrapującego obiektu {}. Przy dużej liczbie parametrów jest to coraz bardziej niewygodne - bo trzeba obsługiwać kolejność licznych parametrów
	constructor(BIKVerificationService, verifications, serviceWrapper) {
		this.BIKVerificationService = BIKVerificationService
		this.verifications = verifications
		this.serviceWrapper = serviceWrapper
	}

	verify(/** @type {Customer} */ customer) {
    const externalResult = this.BIKVerificationService.verify(customer)

    if ([...this.verifications]
        .every(verification => verification.passes(customer.person))
      && externalResult.passed()
      && this.serviceWrapper.verify()
    ) {
			return CustomerVerificationResult.passed(customer.uuid)
		}
		return CustomerVerificationResult.failed(customer.uuid)
	}
}

module.exports = {
  CustomerVerifier,
}
