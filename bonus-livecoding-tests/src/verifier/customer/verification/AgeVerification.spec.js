const { now } = require("../../../lang/time");
const { Person, GENDER } = require("../../../customer");
const { AgeVerification } = require("./AgeVerification");

const { EventEmitter } = require("../../EventEmitter");

/**
 * Przykłady wykorzystania bibliotek do asercji.
 * Tu akurat używamy biblioteki `jasmine`, ale wśród ciekawych alternatyw są: `sinon`, `chai`, i oczywiście `jest`
 */
describe('AgeVerification', () => {

	// Funkcja pomocnicza tworząca obiekty wykorzystywane w testach używana w celu uzyskania
	// lepszej czytelności kodu i reużycia kodu.
	const buildPerson = (age) => {
    const birthDate = now()
    birthDate.setFullYear( birthDate.getFullYear() - age );

		return new Person({
      name: "Anna",
      surname: "Smith",
      dateOfBirth: birthDate,
      gender: Person.GENDER.FEMALE,
      nationalIdentificationNumber: "00000000000"
    })
  }
  
  it('should pass for age between 18 and 99', () => {
		// given
		const person = buildPerson(22)
		const verification = new AgeVerification(new EventEmitter())

		// when
		const passes = verification.passes(person)

    // then
    // (każde z poniższych daje radę w tym przypadku)
		expect(passes).toBe(true)
		expect(passes).toBeTrue()
		expect(passes).toBeTruthy()
  })
  
  // 🤔 true vs truthy, false vs falsy - koercja w JS
  // true i false to booleany
  // ale wszystkie inne typy się implicite rzutują na booleany, kiedy język wymaga w danym miejscu booleana
  // falsy są: 0, 0n (bigint), false, null, undefined, NaN, ''
  // cała reszta jest truthy

  // alternatywna konwencja względem given / when / then - arrange / act / assert
  // (na jedno wychodzi 🙃)
  it('should return false when user older  than 99', () => {
		// arrange
		const person = buildPerson(100)
		const verification = new AgeVerification(new EventEmitter())

		// act
		const passes = verification.passes(person)

		// assert
    // (każde z poniższych daje radę w tym przypadku)
		expect(passes).toBe(false)
		expect(passes).toBeFalse()
		expect(passes).toBeFalsy()
	})

	// Weryfikacja wyjątku przy pomocy biblioteki do asercji.
	it('should throw when age below zero', () => {
		// given
		const person = buildPerson(-1)
		const verification = new AgeVerification(new EventEmitter())

		expect(() => verification.passes(person)).toThrow()
		expect(() => verification.passes(person)).toThrowError("Age cannot be negative.")
		expect(() => verification.passes(person)).toThrowError(TypeError, "Age cannot be negative.")
	})
})
