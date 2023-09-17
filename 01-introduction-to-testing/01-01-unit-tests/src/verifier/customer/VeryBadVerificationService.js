const { sleep } = require("../../lang/time");

/**
 * Przykład źle zaprojektowanego serwisu używającego metody statacznej do realizacji ciężkich operacji,
 * np. zapytań bazodanowych albo zapytań HTTP.
 * @see VeryBadVerificationServiceWrapper
 */
class VeryBadVerificationService {
  static runHeavyQueriesToDatabaseFromStaticMethod(){
    sleep(10000)
    return true
  }
}

module.exports = {
  VeryBadVerificationService,
}
