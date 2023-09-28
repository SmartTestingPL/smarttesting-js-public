const { Person } = require("./customer/Person");

class NameVerification {
  passes(/** @type {Person} */ person) {
	console.log("Person's gender is [" + person.gender.toString() + "]");
		if (person.name == null) {
			throw new TypeError("Name cannot be null.");
		}
		return person.name != "";
	}
}

module.exports = {
  NameVerification,
}
