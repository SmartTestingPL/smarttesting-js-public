const { Person } = require("./customer/Person");
const { VerificationException } = require('./VerificationException');


class NameWithCustomExceptionVerification {
  passes(/** @type {Person} */ person) {
	console.log("Person's gender is [" + person.gender.toString() + "]");
		if (person.name == null) {
			throw new VerificationException("Name cannot be null.");
		}
		return person.name != "";
	}
}

module.exports = {
  NameWithCustomExceptionVerification,
}
