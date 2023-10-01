const { LoanType } = require("../loan")
const { assertEnumValue } = require("../lang/enum")
const { Promotion } = require("./promotion")
const { Customer } = require("../customer")

/**
 * Reprezentuje wniosek o udzielenie pożyczki.
 */
class LoanOrder {
  /** @type {Date} */
  orderDate

  /** @type {Customer} */
  customer

  /** @type {LoanType} */
  type

  /** @type {number} */
  amount

  /** @type {number} */
  interestRate

  /** @type {number} */
  commission

  /** @type {Array<Promotion>} */
  promotions = []

  constructor({ orderDate, customer, amount, interestRate, commission }){
    this.orderDate = orderDate
    this.customer = customer
    this.amount = amount
    this.interestRate = interestRate
    this.commission = commission
  }

  addManagerDiscount(/** @type {string} */ managerId) {
		const promotion = new Promotion({
      name: "Manager Promo: " + managerId,
      discount: 50,
    })
		this.promotions.push(promotion)
	}

  setType(type){
    assertEnumValue(type, LoanType)
  }
}

module.exports = {
  LoanOrder,
}
