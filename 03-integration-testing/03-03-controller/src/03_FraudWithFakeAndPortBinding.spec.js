const request = require("supertest");
const mock = require('mock-require');

const { Person } = require('./Person');
const { CustomerVerificationResult } = require('./CustomerVerificationResult');

/**
 * Testy do slajdu z testowaniem kontrolera po warstwie HTTP
 * z alokacją portu z zamockowanym serwisem aplikacyjnym.
 *
 * W tym teście nie wyślemy prawdziwe żądanie HTTP
 * i zweryfikujemy czy otrzymujemy rezultat, który nas interesuje.
 *
 * Mockujemy nadpisaną wersję serwisu aplikacyjnego, która
 * zwraca wartości "na sztywno".
 * Gdybyśmy w którymś z komponentów mieli połączenie z bazą danych,
 * NIE zostałoby ono zrealizowane.
 */

describe('FraudControllerWithFakeAndPortBinding', () => {
  
  var app

  beforeEach(() => {
    mock('./app/verifier', { customerVerifier: {
      verify(/** @type {Person} */ person) {
        console.log("MOCK IMPL")
        if (person.age() < 10) {
          return CustomerVerificationResult.failed(person.uuid);
        }
        return CustomerVerificationResult.passed(person.uuid);
      }
    } });

    for (const module of ['./app/verifier', './app/fraud', './app/app']){
      mock.reRequire(module);
    }
    app = require("./app/app");
  })

  afterEach(() => {
    mock.stopAll()
    // OR: mock.stop('./app/verifier')
  })

  // mockujemy implementację zależności - wcześniej 15-latek nie dostałby kredytu, teraz dostanie 🙃

  it('should accept loan application when person with proper age', () => {
    const properZbigniew = {
      "uuid": "7b3e02b3-6b1a-4e75-bdad-cef5b279b074",
      "name": "Zbigniew",
      "surname": "Właściwowski",
      "dateOfBirth": "1999-01-01",
      "gender": "MALE",
      "nationalIdentificationNumber" : "18210116954"
    };

    return request(app)
      .post("/fraudCheck")
      .send(properZbigniew)
      .expect(200)
  });

  it('should reject loan application when person too young', () => {
    const tooYoundZbigniew = {
      "uuid": "7b3e02b3-6b1a-4e75-bdad-cef5b279b074",
      "name": "Zbigniew",
      "surname": "Zamłodowski",
      "dateOfBirth": "2005-01-01", // 15 years old
      // ! with mock implementation (fail for age < 10), 15 years old should pass
      "gender": "MALE",
      "nationalIdentificationNumber" : "18210116954"
    };

    return request(app)
      .post("/fraudCheck")
      .send(tooYoundZbigniew)
      .expect(200)
  });
});
