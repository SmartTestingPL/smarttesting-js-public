const Axios = require('axios')
const { Customer } = require('./Customer');
const { CustomerVerificationResult } = require('./CustomerVerificationResult');
const logger = require('./Logger');

class BIKVerificationService {

  constructor(/** @type {string} */ bikServiceUri) {
		this.bikServiceUri = bikServiceUri;
  }
  
  async verify(/** @type {Customer} */ customer, timeout = 0){
    const url = `${this.bikServiceUri}/${customer.person.nationalIdentificationNumber}`
    try {
      const response = await Axios.get(url, { timeout })
      return response.data
    } catch (e){
      // wyłapujemy wyjątek związany z połączeniem i chcemy go przeprocesować
      this.processException(e)
    }

    return CustomerVerificationResult.failed(customer.uuid)
  }

  /**
	 * Domyślna implementacja loguje wyjątek do konsoli. Wyjątek nie jest ponownie rzucany.
	 * @param error - wyjątek do obsłużenia
	 */
	processException(error) {
		logger.error(`Http request execution failed: ${error}`)
	}
}

module.exports = {
  BIKVerificationService,
}
