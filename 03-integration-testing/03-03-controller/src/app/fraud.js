const { CustomerVerificationResultStatus } = require('../CustomerVerificationResult');
const { Person } = require('../Person');
const { customerVerifier } = require('./verifier')

const middleware = (req, res) => {
  const person = new Person(req.body)

  console.log(`Received a verification request for person ${JSON.stringify(person)}`)
  const result = customerVerifier.verify(person)
  if (result.status == CustomerVerificationResultStatus.VERIFICATION_FAILED){
    res.status(401).send()
  } else {
    res.status(200).send()
  }
}

module.exports = middleware
