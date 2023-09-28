const { now } = require("../lang/time")
const { Loan } = require("./Loan")
const { NumberOfInstallmentsValidationException, CommissionValidationException } = require("./validation")
const { LoanCreatedEvent } = require('./LoanCreatedEvent')

class LoanService {
    eventEmitter
    mongoDbAccessor
    postgresAccessor

    constructor(eventEmitter, mongoDbAccessor, postgresAccessor){
        this.eventEmitter = eventEmitter
        this.mongoDbAccessor = mongoDbAccessor
        this.postgresAccessor = postgresAccessor
    }

    createLoan(/** @type {import('../order/LoanOrder').LoanOrder} */ loanOrder, /** @type {number} */ numberOfInstallments){
		// Forget to pass argument (validate field instead)
		this.validateNumberOfInstallments(numberOfInstallments);
		// Forget to add this method add first
		this.validateCommission(loanOrder.commission);
		this.updatePromotions(loanOrder);
		const loan = new Loan({ loanOpenedDate: now(), loanOrder, numberOfInstallments });
		this.eventEmitter.emit(new LoanCreatedEvent({ uuid: loan.uuid }));
		return loan;
    }

    validateCommission(/** @type {number} */ commission){
        if (!commission || commission <= this.mongoDbAccessor.getMinCommission()) {
            throw new CommissionValidationException()
        }
    }

    validateNumberOfInstallments(/** @type {number} */ numberOfInstallments){
        if (numberOfInstallments <= 0) {
            throw new NumberOfInstallmentsValidationException()
        }
    }

    updatePromotions(/** @type {import('../order/LoanOrder').LoanOrder} */ loanOrder){
        const updatedPromotions = loanOrder.promotions
            .filter(p => this.postgresAccessor.getValidPromotionsForDate(now()).includes(p))
        // loanOrder.promotions.length = 0 // clear
        loanOrder.promotions = updatedPromotions
    }
}

module.exports = {
    LoanService
}
