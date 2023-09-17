const { Person, GENDER } = require("../../../customer/Person");
const { createDate } = require("../../../lang/time");
const { IdentificationNumberVerification } = require("./IdentificationNumberVerification");

// Zawiera przykłady różnych konwencji nazewniczych metod testowych. Warto jest trzymać
// się jednej dla całej organizacji.
describe('IdentificationNumberVerification', () => {

	function buildPerson(/** @type {Date} */ birthDate, /** @type {GENDER} */ gender) {
		return new Person({
			name: "John",
			surname: "Doe",
			dateOfBirth: birthDate,
			gender,
			nationalIdentificationNumber: "98031416402"
		});
	}

	it('should pass for correct identification number', () => {
		//given
		const person = buildPerson(createDate(1998, 3, 14), GENDER.FEMALE);
		const verification = new IdentificationNumberVerification();

		// when
		const passes = verification.passes(person);

		// then
		expect(passes).toBe(true);
	});
	
	it('should fail for inconsistent gender', () => {
		//given
		const person = buildPerson(createDate(1998, 3, 14), GENDER.MALE);
		const verification = new IdentificationNumberVerification();

		// when
		const passes = verification.passes(person);

		// then
		expect(passes).toBe(false);
	});

	it('should return false for wrong year of birth', () => {
		//given
		const person = buildPerson(createDate(2000, 3, 14), GENDER.FEMALE);
		const verification = new IdentificationNumberVerification();

		// when
		const passes = verification.passes(person);

		// then
		expect(passes).toBe(false);	
	});
});
