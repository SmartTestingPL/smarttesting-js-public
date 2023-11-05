const { Person, GENDER } = require("./customer/Person");
const { now } = require("./lang/time");

const { NameVerification } = require('./NameVerification');
const { NameWithCustomExceptionVerification } = require('./NameWithCustomExceptionVerification');
const { VerificationException } = require('./VerificationException');

describe('NameVerification', () => {

  /**
	 * Test, w którym weryfikujemy czy został rzucony bardzo generyczny wyjątek
   * (tzn. bez precyzyjnego komunikatu, co konkretnie spowodowało błąd).
	 *
	 * Test ten przechodzi nam przypadkowo, gdyż NPE leci w innym miejscu w kodzie
	 * niż się spodziewaliśmy.
	 *
	 * Uruchamiając ten test nie widzimy żeby zalogowała nam się linijka z klasy NameVerification
	 */
  it('should throw an exception when checking verification', () => {
    const verifier = new NameVerification()
    // sidenote - poniżej, składniowo, musimy wyrażenie verifier.passes(anna()) ubrać w lambdę, żeby framework testowy był w stanie całość obsłużyć
    // bez lambdy, składniowo, wyjątek zostałby rzucony zanim framework testowy byłby w stanie jakkolwiek zareagować.
    // Ogólnie w JS ubieranie w lambdy jest często przydatne

    // najbardziej ogólna asercja dot. błędów jaka jest dostępna...
    expect(() => verifier.passes(anna())).toThrow()

    // nie rzucamy kamieniem, rzucamy błędem (w JS rzucać można cokolwiek...)
    expect(() => verifier.passes(anna())).toThrowError()

    // nie dość, że rzucamy błędem, to jeszcze błędem konkretnego rodzaju! fiu fiu.
    expect(() => verifier.passes(anna())).toThrowError(TypeError)
  });

  /**
	 * Poprawiona wersja poprzedniego testu, gdzie tym razem zweryfikujemy
	 * zawartość wiadomości w rzuconym wyjątku.
	 *
	 * Od-skipuj test (zamień `xit` na `it`), żeby zobaczyć, że test się wysypuje
   * (Expected function to throw TypeError with message 'Name cannot be null', but it threw TypeError with message 'Cannot read property 'toString' of undefined'.)
   * gdyż nie jest wołana nasza wersja TypeError, tylko domyślna,
	 * w momencie wołania metody {@code toString()} na wartości {@code null}
	 * zwracanej przez {@link Person#gender}.
	 *
	 * Problem polega na tym, że w konstruktorze {@link Person} ktoś zapomniał ustawić
	 * pola {@code gender}.
	 */
  xit('should throw an exception when checking verification only', () => {
    const verifier = new NameVerification()

    // teraz łapiemy precyzyjnie 🤗
    expect(() => verifier.passes(anna())).toThrowError(TypeError, 'Name cannot be null')
  });

  /**
	 * W momencie, w którym nasza aplikacja rzuca wyjątki domenowe, wtedy nasz test
	 * może po prostu spróbować go wyłapać.
	 *
	 * Od-skipuj test (zamień `xit` na `it`), żeby zobaczyć, że test się wysypuje, gdyż wyjątek,
	 * który poleci to {@link TypeError}, a nie {@link VerificationException}.
	 */
  xit('should fail verification when name is invalid', () => {
    const verifier = new NameWithCustomExceptionVerification()
    expect(() => verifier.passes(anna())).toThrowError(VerificationException)
    // expect(() => verifier.passes(anna())).toThrowError(VerificationException, 'Name cannot be null')
  });

	/**
	 * Koncepcyjnie to samo co powyżej. Do zastosowania w momencie, w którym
	 * nie posiadacie dedykowanych bibliotek do asercji, takich jak np. jasmine.
   * W co wątpię, ale w formie ciekawostki.
   * 
   * Asercje to po prostu wyjątki, które można obsługiwać try..catch.
	 *
	 * Łapiemy w {@code try {...} catch {...} } wywołanie metody, która powinna rzucić wyjątek.
	 * Koniecznie należy wywalić test, jeśli wyjątek nie zostanie rzucony!!!
	 *
	 * W sekcji {@code catch} możemy wykonać dodatkowe asercje na rzuconym wyjątku.
	 */
  xit('should fail verification when name is invalid and assertion is done manually', () => {
    const verifier = new NameWithCustomExceptionVerification()
    try {
      () => verifier.passes(anna())
      			// Koniecznie należy wywalić test, jeśli wyjątek nie zostanie rzucony!!!
			fail("Should fail the verification");
    } catch (e) {
			// Dodatkowe asercje błędu jeśli potrzebne
    }

    // (^ to jest to co np. jasmine robi pod spodem)
  });

  const anna = () => {
    return new Person({
      name: "Anna",
      surname: "Smith",
      dateOfBirth: now(),
      gender: GENDER.FEMALE,
      nationalIdentificationNumber: "00000000000"
    })
	}

  const noName = () => {
    return new Person({
      name: undefined,
      surname: "Smith",
      dateOfBirth: now(),
      gender: GENDER.FEMALE,
      nationalIdentificationNumber: "00000000000"
    })
	}
});