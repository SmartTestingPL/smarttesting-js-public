const { CustomerVerifier } = require('./CustomerVerifier')
const { Person } = require('./Person')

/**
 * Klasa wskazana na slajdzie opisującym kontroler FraudController.
 *
 * Kontroler, który dla żądania HTTP z metodą POST, w ciele którego
 * znajdzie się obiekt z klientem w postaci JSONa, zweryfikuje czy dana
 * osoba jest oszustem czy też nie.
 */
class FraudController {

  constructor(/** @type {CustomerVerifier} */ customerVerifier){
    this.customerVerifier = customerVerifier
  }

  /**
	 * Metoda, która zostanie uruchomiona w momencie uzyskania odpowiedniego żądania HTTP.
	 * @param person - zdeserializowany obiekt z formatu JSON
	 * @return status 200 dla osoby uczciwej, 401 dla oszusta
	 */
  fraudCheck(/** @type {Person} */person){
    console.log(`Received a verification request for person ${JSON.stringify(person)}`)
    const result = this.customerVerifier.verify(person)
    if (result.status == "VERIFICATION_FAILED"){
      return {
        status: 401,
        message: "Unauthorized"
      }
    }
    return {
      status: 200,
      message: "OK"
    }
  }
}

module.exports = {
  FraudController,
};
