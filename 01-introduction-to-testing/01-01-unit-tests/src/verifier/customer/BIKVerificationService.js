class BIKVerificationService {

  constructor(/** @type {string} */ bikServiceUri) {
		this.bikServiceUri = bikServiceUri;
		// this.client = HttpClientBuilder.create().build();
	}
}

module.exports = {
  BIKVerificationService,
}
