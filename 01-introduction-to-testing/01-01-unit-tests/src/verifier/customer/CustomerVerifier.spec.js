const { v4: uuid } = require('uuid')
const { Customer, Person, GENDER } = require('../../customer')

const { AgeVerification, IdentificationNumberVerification } = require('./verification')
const { SimpleVerification } = require('./SimpleVerification')
const { CustomerVerificationResult, CustomerVerificationResultStatus } = require('./CustomerVerificationResult')
const { CustomerVerifier } = require('./CustomerVerifier')
const { BIKVerificationService } = require('./BIKVerificationService')
const { VeryBadVerificationServiceWrapper } = require('./VeryBadVerificationServiceWrapper')

/**
 * Zawiera przykłady inicjalizacji w polach testowych, przykład false-positive,
 * przykład zastosowania Test Doubles.
 */
describe('CustomerVerifier', () => {
  
  const buildCustomer = () => {
    return new Customer({
      uuid: uuid(),
      person: new Person({
        name: "John",
        surname: "Smith",
        dateOfBirth: new Date(1996, 7 /* couting from 0 */, 28, 12, 0, 0),
        gender: GENDER.MALE,
        nationalIdentificationNumber: "96082812079"
      })
    })
  }

	// Implementacja testowa (Test Double) w celu uniknięcia kontaktowania się z
	// zewnętrznym serwisem w testach jednostkowych.
	class TestVerificationService extends BIKVerificationService {

		constructor() {
			super("http://example.com");
		}

		verify(/** @type {Customer} */ customer) {
			return CustomerVerificationResult.passed(customer.uuid);
		}
	}

	// Implementacja testowa (Test Double) w celu uniknięcia kontaktowania się z
	// zewnętrznym serwisem w testach jednostkowych.
	class TestBadServiceWrapper extends VeryBadVerificationServiceWrapper {
		verify() {
			// do not run all these database and network operations in a unit test
			return true;
		}
  }

  const buildVerifications = () => {
		const verifications = new Set()
		verifications.add(new AgeVerification())
		verifications.add(new IdentificationNumberVerification())
		return verifications
  }

	// W zależności od potrzeb, inicjalizacja w polach może być stanowa
  // dla test (świeży stan dla wywołania każdej metody) lub per cały suite testów.
  // poniżej - świeży serwis per test
  // gdyby nie było potrzebne tworzenie świeżej instancji, zostałby const service... zaś `beforeEach` usunięty

  /** @type {CustomerVerifier} */
  let service
  beforeEach(() => {
    service = new CustomerVerifier(
      new TestVerificationService(),
      buildVerifications(),
      new TestBadServiceWrapper()
    )
  })
    
	it('should verify correct person', () => {
		// Given
		const customer = buildCustomer()

    // When
		const result = service.verify(customer)

		// Then
		expect(result.status).toEqual(CustomerVerificationResultStatus.VERIFICATION_PASSED)
		expect(result.userId).toEqual(customer.uuid)
  });

  const buildSimpleVerification = () => {
		const verifications = new Set()
		verifications.add(new SimpleVerification())
		return verifications
  }

	// Przykład złego testu: test, który przechodzi nawet bez implementacji
	it('should fail simple verification', () => {
		// Given
		const customer = buildCustomer()
		const service = new CustomerVerifier(
      new TestVerificationService(),
      buildSimpleVerification(),
      new TestBadServiceWrapper()
    )

		// When
		const result = service.verify(customer)

    // `toBe` vs `toEqual` poniżej
    // `toBe` sprawdza "tożsamość", czyli w przypadku obiektów - referencję
    // `toEqual` sprawdza wartość (potencjalnie rekursywnie, jeśli trzeba)
    // w przypadku prymitywów - jeden pies 🙃
		expect(result.status).toBe(CustomerVerificationResultStatus.VERIFICATION_FAILED)
		expect(result.status).toEqual(CustomerVerificationResultStatus.VERIFICATION_FAILED)
	})
})
