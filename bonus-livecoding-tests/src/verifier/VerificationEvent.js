/**
 * Zdarzenie związane z weryfikacją klienta.
 */
class VerificationEvent {

	/** @type {boolean} */
	_passed

	constructor(/** @type {boolean} */ passed) {
		this._passed = passed;
	}

	passed() {
		return this._passed;
	}
}

module.exports = {
	VerificationEvent,
}
