const { v4: uuid } = require('uuid')

const { LoanValidationException } = require('./validation')
const { roundTo } = require('../lang/math')
const { now } = require('../lang/time')

class Loan {
    /** @type {Date} */
    loanOpenedDate

    /** @type {number} */
    amount

    /** @type {number} */
    numberOfInstallments

    /** @type {number} */
    installmentAmount

    /** @type {string} */
    uuid

    constructor({ loanOrder, numberOfInstallments, loanOpenedDate }){
        this.loanOpenedDate = loanOpenedDate || now()
		this.amount = this.calculateLoanAmount(loanOrder)
		this.numberOfInstallments = numberOfInstallments
		this.installmentAmount = roundTo(this.amount / numberOfInstallments, 2)
		this.uuid = uuid()
    }

    calculateLoanAmount(/** @type {import('../order/LoanOrder').LoanOrder} */ loanOrder){
        this.validateElement(loanOrder.amount)
        this.validateElement(loanOrder.interestRate)
        this.validateElement(loanOrder.commission)
        const interestFactor = 1 + roundTo(loanOrder.interestRate / 100, 2)
        const baseAmount = (loanOrder.amount * interestFactor) + loanOrder.commission
        return this.applyPromotionDiscounts(loanOrder, baseAmount)
    }

    applyPromotionDiscounts(/** @type {import('../order/LoanOrder').LoanOrder} */ loanOrder, /** @type {number} */ baseAmount){
        const discountSum = loanOrder.promotions
            .map(p => p.discount)
            .reduce((sum, value) => sum + value, 0)
        const fifteenPercentOfBaseSum = roundTo(baseAmount * 15/100, 2)
        if (baseAmount <= fifteenPercentOfBaseSum){
            return baseAmount - fifteenPercentOfBaseSum
        }
        return baseAmount - discountSum
    }

    validateElement(/** @type {number} */ elementAmount){
        if (!elementAmount || elementAmount < 1) {
            throw new LoanValidationException()
        }
    }
}

module.exports = {
    Loan
}
