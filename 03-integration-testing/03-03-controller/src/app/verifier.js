const { AgeVerification } = require('../AgeVerification');
const { CustomerVerifier } = require('../CustomerVerifier');

const ageVerifier = new AgeVerification()
const customerVerifier = new CustomerVerifier([ageVerifier])
// const controller = new FraudController(customerVerifier)

module.exports = {
  customerVerifier
}
