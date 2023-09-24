/**
 * Status wyniku weryfikacji klienta.
 */
const Status = Object.freeze({
  VERIFICATION_PASSED: "VERIFICATION_PASSED",
  VERIFICATION_FAILED: "VERIFICATION_FAILED",
})

/**
 * Rezultat weryfikacji klienta.
 */
class CustomerVerificationResult {
  /** @type {string} */
  userId

  /** @type {keyof Status} */
  status

  constructor({ userId, status }){
    this.userId = userId
    this.status = status
  }

  static passed(userId){
    return new CustomerVerificationResult({
      userId,
      status: Status.VERIFICATION_PASSED
    })
  }

  static failed(userId){
    return new CustomerVerificationResult({
      userId,
      status: Status.VERIFICATION_FAILED
    })
  }

  passed(){
    return this.status === Status.VERIFICATION_PASSED
  }
}

module.exports = {
  CustomerVerificationResultStatus: Status,
  CustomerVerificationResult,
}
