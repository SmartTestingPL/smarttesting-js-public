class VerificationException extends Error {
  constructor(message) {
    super(message);
    this.name = "VerificationException";
  }

  toString(){
    return `[VERIFICATION] ${super.toString()}`
  }
}

module.exports = {
  VerificationException,
}
