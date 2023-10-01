const { FraudController } = require('./FraudController');
const { AgeVerification } = require('./AgeVerification');
const { CustomerVerifier } = require('./CustomerVerifier');
const { createMockPerson } = require('./mocks');

/**
 * Testowanie kontrolera jako obiektu.
 *
 * Jeśli zainicjujemy kontroler jako obiekt oraz jego zależności to z punktu widzenia kontrolera
 * mamy nic innego jak test jednostkowy. W taki sposób testujemy bez warstwy HTTP
 * logikę naszych komponentów. Zakładając, że przetestowaliśmy jednostkowo
 * `customerVerifier`, taki test nam nic nie daje.
 *
 * Zatem skoro naszym celem jest zweryfikowanie czy nasz kontroler komunikuje się po warstwie HTTP to kompletnie nam się to nie udało.
 *
 * Czy jest to zły test? Nie, ale trzeba włączyć w to testowanie warstwy HTTP.
 */

const createController = () => {
  const ageVerifier = new AgeVerification();
  const customerVerifier = new CustomerVerifier([ageVerifier]);
  const controller = new FraudController(customerVerifier);
  return controller;
}

describe('FraudController', () => {
  it('should reject loan application when person too young', () => {
    const controller = createController();

    const tooYoungZbigniew = createMockPerson();
    const result = controller.fraudCheck(tooYoungZbigniew);
    expect(result).toEqual({
      status: 401,
      message: 'Unauthorized',
    });
  });
});


