const { v4: uuid } = require('uuid')

const { Customer, Person, GENDER } = require('../../customer')
const { EventEmitter } = require('../EventEmitter')
const { CustomerBuilder } = require('./CustomerBuilder')
const { CustomerVerifier } = require('./CustomerVerifier')
const { CustomerVerificationResultStatus } = require('./CustomerVerificationResult')
const { AgeVerification, NameVerification, IdentificationNumberVerification } = require('./verification')
const { VerificationEvent } = require('../VerificationEvent')

/**
 * Zawiera przykłady zastosowania mocka w celu weryfikacji interakcji z obiektem typu EventEmitter,
 * przykłady zastosowania buildera obiektów testowych, przykłady testowania komunikacji/interakcji.
 */
describe('CustomerVerifier', () => {
	
  const buildCustomer = () => {
    return new Customer({
      uuid: uuid(),
      person: new Person({
        name: "John",
        surname: "Smith",
        dateOfBirth: new Date(1996, 7, 28, 12, 0, 0),
        gender: GENDER.MALE,
        nationalIdentificationNumber: "96082812079"
      })
    })
	}
	
	/** @type {EventEmitter} */
	let eventEmitter;

	/** @type {CustomerVerifier} */
	let customerVerifier;

	/** @type {Customer} */
	let customer;

	const buildVerifications = (/** @type {EventEmitter} */ eventEmitter) => [
		new AgeVerification(eventEmitter),
		new IdentificationNumberVerification(eventEmitter),
		new NameVerification(eventEmitter),
	]

	beforeEach(() => {
		customer = buildCustomer();
		// Tworzenie mocka obiektu typu EventEmitter
		eventEmitter = jasmine.createSpyObj('EventEmitter', ['emit'])
		customerVerifier = new CustomerVerifier(buildVerifications(eventEmitter));
	})

	// Zastosowanie buildera w setupie testu.
	it('should verify correct person', () => {
		customer = new CustomerBuilder()
			.withNationalIdentificationNumber("80030818293")
			.withDateOfBirth(1980, 3, 8)
			.withGender(Person.GENDER.MALE)
			.build();
		const result = customerVerifier.verify(customer);

		expect(result.status).toEqual(CustomerVerificationResultStatus.VERIFICATION_PASSED);
		expect(result.userId).toEqual(customer.uuid);
	});

	// Testowanie komunikacji/interakcji
	it('should emit verification event', () => {
		customerVerifier.verify(customer);

		// oryginał (java)
		// > Weryfikacja interakcji - sprawdzamy, że metoda emit(...) została wywołana 3 razy
		// > z argumentem typu VerificationEvent, którego metoda passed(...) zwraca true
		
		// w JS (nie tylko jasmine) nie mamy API na tyle rozrośniętego, żeby pozwalało "ładnymi metodami"
		// rozpisać każdego wariantu, na modłę wzorca builder, strumieniowania itp
		// wbudowanym API możemy sprawdzić ogólnie:
		expect(eventEmitter.emit).toHaveBeenCalledTimes(3) // że trzy razy
		expect(eventEmitter.emit).toHaveBeenCalledWith(new VerificationEvent(true)) // że taki argument był przekazany
		
		// ale jeśli chcemy robić dokładne sprawdzenia, dobieramy się do szczegółów wywołań strukturalnie (jak to w JS)
		for (const call of eventEmitter.emit.calls.all()){ // API jasmine - dawaj wszystkie szczegóły wywołań, iterujemy
			const { args: [event] } = call // dawaj pierwszy argument wywołania - to nasz event (natywny JS od ES2015)
			expect(event.passed()).toBeTruthy(); // 
		}
		// suma summarum osiągnęliśmy dokładnie to samo, tyle że w stylu bardziej strukturalnym
		// to standardowe podejście w JS
		// plusem podejścia jest mniejsza potrzeba znajomości API frameworków. Frameworki są do siebie bardzo podobne, znajomość jednego często wystarcza aby skutecznie działać z innymi.
		// minusem jest to, że komunikat błędu, jeśli coś się nie powiedzie, nie będzie aż tak czytelny. Nothing is perfect ¯\_(ツ)_/¯
	});
})
