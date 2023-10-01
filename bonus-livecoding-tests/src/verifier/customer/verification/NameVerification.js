const { extremelyNaive__isAlpha } = require("../../../lang/string");
const { Person } = require("../../../customer/Person");

const { EventEmitter } = require('../../EventEmitter');
const { VerificationEvent } = require('../../VerificationEvent');

class NameVerification {

	constructor(/** @type {EventEmitter} */ eventEmitter) {
		this.eventEmitter = eventEmitter;
	}

	passes(/** @type {Person} */ person) {
		const passes = extremelyNaive__isAlpha(person.name);
		this.eventEmitter.emit(new VerificationEvent(passes));
		return passes;
	}
}

module.exports = {
	NameVerification,
}
