const request = require("supertest");
const app = require("./app/app");

/**
 * Testy do slajdu z testowaniem kontrolera po warstwie HTTP z alokacją portu.
 *
 * Dysponujemy całą aplikacją express-ową i jako całość testujemy ją przy użyciu supertest - biblioteki specjalnie do tego celu służącej.
 *
 * W tym teście wyślemy prawdziwe żądanie HTTP
 * i zweryfikujemy czy otrzymujemy rezultat, który nas interesuje.
 *
 * Gdybyśmy w którymś z komponentów mieli połączenie z bazą danych,
 * zostałoby ono zrealizowane.
 */

describe('FraudControllerWithPortBinding', () => {
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
      "gender": "MALE",
      "nationalIdentificationNumber" : "18210116954"
    };

    return request(app)
      .post("/fraudCheck")
      .send(tooYoundZbigniew)
      .expect(401)
  });
});


