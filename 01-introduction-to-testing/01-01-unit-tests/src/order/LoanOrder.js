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

  constructor({ orderDate, customer }){
    this.orderDate = orderDate
    this.customer = customer
  }

  setType(type){
    assertEnumValue(type, LoanType)
  }
}

module.exports = {
  LoanOrder,
}
