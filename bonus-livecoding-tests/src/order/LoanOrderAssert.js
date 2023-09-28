const { LoanOrder } = require('./LoanOrder')
const { now } = require('../lang/time');

class LoanOrderAssert {

  /** @type {LoanOrder} */
  loanOrder

  constructor({ loanOrder }){
    this.loanOrder = loanOrder
  }

  registeredToday(){
    expect(this.loanOrder.orderDate.getDate()).toEqual(now().getDate())
    return this
  }

  hasPromotion(/** @type {string} */ promotionName){
    const promotions = this.loanOrder.promotions
      .filter(promotion => promotion.name === promotionName)
    expect(promotions.length).toEqual(1)
    return this
  }

  hasOnlyOnePromotion(){
		this.hasPromotionNumber(1)
		return this
  }

  hasPromotionNumber(/** @type {number} */ number){
		expect(this.loanOrder.promotions.length).toEqual(number)
		return this
  }
  
  firstPromotionHasDiscountValue(/** @type {number} */ number){
    expect(this.loanOrder.promotions[0].discount).toEqual(number)
    return this
  }

  static then(/** @type {LoanOrder} */ loanOrder){
    return new LoanOrderAssert({ loanOrder });
  }

  correctStudentLoanOrder(){
    return this.registeredToday()
      .hasPromotion("Student Promo")
      .hasOnlyOnePromotion()
      .firstPromotionHasDiscountValue(10)
  }
}

module.exports = {
  LoanOrderAssert,
}
