// dla odmiany - to będzie nie klasa, a luźne funkcje zmontowane potem w obiekt

const { now } = require("../lang/time");
const { LoanOrder } = require("./LoanOrder");
const { LoanType } = require("../loan");
const { Promotion } = require("./promotion");
const { Customer } = require("../customer/customer");

/**
 * Przynanie pożyczki w zależności od typu pożyczki i obowiązujących promocji.
 */
const studentLoanOrder = (/** @type {Customer} */customer) => {
  if (!customer.isStudent()) {
    throw new TypeError("Cannot order student loan if Customer is not a student.");
  }
  const currentTime = now()
  const loanOrder = new LoanOrder({ orderDate: currentTime, customer });
  loanOrder.setType(LoanType.STUDENT);
  loanOrder.promotions.push(new Promotion({
    name: "Student Promo",
    discount: 10,
  }));
  loanOrder.commission = 200
  return loanOrder;
}

const LoanOrderService = {
  studentLoanOrder,
}

module.exports = {
  LoanOrderService,
}
