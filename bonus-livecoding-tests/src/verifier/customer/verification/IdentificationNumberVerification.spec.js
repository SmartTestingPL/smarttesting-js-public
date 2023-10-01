const fs = require('fs')

const { Person, GENDER } = require("../../../customer/Person");
const { createDate } = require("../../../lang/time");
const { IdentificationNumberVerification } = require("./IdentificationNumberVerification");

const { EventEmitter } = require("../../EventEmitter");
const { isTrue } = require("../../../lang/string");

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
		const verification = new IdentificationNumberVerification(new EventEmitter());

		// when
		const passes = verification.passes(person);

		// then
		expect(passes).toBe(true);
	});
	
	it('should fail for inconsistent gender', () => {
		//given
		const person = buildPerson(createDate(1998, 3, 14), GENDER.MALE);
		const verification = new IdentificationNumberVerification(new EventEmitter());

		// when
		const passes = verification.passes(person);

		// then
		expect(passes).toBe(false);
	});

	it('should return false for wrong year of birth', () => {
		//given
		const person = buildPerson(createDate(2000, 3, 14), GENDER.FEMALE);
		const verification = new IdentificationNumberVerification(new EventEmitter());

		// when
		const passes = verification.passes(person);

		// then
		expect(passes).toBe(false);	
	});

	const csv = require('csvtojson')
	const parse = require('csv-parse/lib/sync')


	describe('CSV dataset', () => {
		const input = fs.readFileSync(__dirname + '/../../../../resources/pesel.csv')
		const testcases = parse(input, {
			columns: true,
			skip_empty_lines: true
		})

		for (const { birthDate, gender, passes } of testcases){
			it(`should return ${passes} for birth date ${birthDate} and gender ${gender}`, () => {
				//given
				const date = createDate(...birthDate.split('-'))
				const person = buildPerson(date, gender);
				const verification = new IdentificationNumberVerification(new EventEmitter());

				// when
				const actualPasses = verification.passes(person);

				// then
				expect(isTrue(passes)).toBe(actualPasses);	
			});
		}
	});

	// Test tych samych przypadków co w 3 różnych testach powyżej przy pomocy
	// parametrów zdefiniowanych w test-secie
	describe('JSON dataset', () => {

		const testcases = [
			{ birthDate: '1998-03-14', gender: 'FEMALE', passes: true },
			{ birthDate: '1998-03-14', gender: 'MALE', passes: false },
			{ birthDate: '2000-03-14', gender: 'FEMALE', passes: false }
		]

		for (const { birthDate, gender, passes } of testcases){
			it(`should return ${passes} for birth date ${birthDate} and gender ${gender}`, () => {
				//given
				const date = createDate(...birthDate.split('-'))
				const person = buildPerson(date, gender);
				const verification = new IdentificationNumberVerification(new EventEmitter());

				// when
				const actualPasses = verification.passes(person);
``
				// then
				expect(passes).toBe(actualPasses);	
			});
		}
	});
});
