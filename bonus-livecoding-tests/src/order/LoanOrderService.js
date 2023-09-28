const { now } = require('../lang/time')
const { Customer } = require('../customer')
const { LoanOrder } = require('./LoanOrder')
const { Promotion } = require('./Promotion')
const { LoanType } = require('../loan')


/**
 * Serwis procesujący przynawanie pożyczek w zależności od typu pożyczki i obowiązujących promocji.
 */
class LoanOrderService {

	postgresDBAccessor
  
  	mongoDbAccessor

	constructor(postgresDBAccessor, mongoDbAccessor) {
		this.postgresDBAccessor = postgresDBAccessor;
		this.mongoDbAccessor = mongoDbAccessor;
	}

	studentLoanOrder(/** @type {Customer} */ customer) {
		if (!customer.isStudent()) {
			throw new TypeError("Cannot order student loan if customer is not a student.");
		}
		const currentTime = now();
		const loanOrder = new LoanOrder({
			orderDate: currentTime,
			customer,
		});
		loanOrder.setType(LoanType.STUDENT);
		const discount = this.mongoDbAccessor.getPromotionDiscount("Student Promo");

		loanOrder.promotions.push(new Promotion({
			name: "Student Promo",
			discount,
		}));

		this.postgresDBAccessor.updatePromotionStatistics("Student Promo");
		return loanOrder;
	}
}

module.exports = {
  LoanOrderService,
}
