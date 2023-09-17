const { v4: uuid } = require('uuid')
const { now } = require('../lang/time');

const { Customer } = require("../customer/Customer");
const { Person, GENDER } = require('../customer/Person');
const { LoanOrderService } = require('./LoanOrderService');

const { LoanOrderAssert } = require('./LoanOrderAssert')

// Funkcja zawierająca setup klientów typu STUDENT na potrzeby testów
const exampleStudent = () => {
  const customer = new Customer({
    uuid: uuid(),
    person: new Person({
      name: "John",
      surname: "Smith",
      dateOfBirth: new Date(1996, 8, 28),
      gender: GENDER.MALE,
      nationalIdentificationNumber: "96082812079"
    })
  })
  customer.student()
  return customer
}

describe('LoadOrderService', () => {

  // Wywołanie metody setupującej w teście.
  it('should create student loan order', () => {
    const student = exampleStudent()
    const loanOrder = LoanOrderService.studentLoanOrder(student)

    expect(loanOrder.orderDate.getDate()).toEqual(now().getDate())

    const filteredPromotions = loanOrder.promotions
      .filter(promotion => promotion.name === "Student Promo")
    expect(filteredPromotions.length).toEqual(1)
    expect(loanOrder.promotions.length).toEqual(1)
    expect(loanOrder.promotions[0].discount).toEqual(10)
  });

  // Przykład zastosowania AssertObject Pattern
  it('(assert object) should create student loan order', () => {
    const student = exampleStudent()
    const loanOrder = LoanOrderService.studentLoanOrder(student)

		const orderAssert = new LoanOrderAssert({ loanOrder });
		orderAssert.registeredToday();
		orderAssert.hasPromotion("Student Promo");
		orderAssert.hasOnlyOnePromotion();
		orderAssert.firstPromotionHasDiscountValue(10);
  });

  // Przykład zastosowania AssertObject Pattern z chainowaniem asercji
  it('(chained) should create student loan order', () => {
    const student = exampleStudent()
    const loanOrder = LoanOrderService.studentLoanOrder(student)

		LoanOrderAssert.then(loanOrder).registeredToday()
				.hasPromotion("Student Promo")
				.hasOnlyOnePromotion()
				.firstPromotionHasDiscountValue(10);
  });

  // Przykład zastosowania AssertObject Pattern z użyciem metody wrappującej chain asercji
  it('(chained assert object) should create student loan order', () => {
    const student = exampleStudent()
    const loanOrder = LoanOrderService.studentLoanOrder(student)

    LoanOrderAssert.then(loanOrder).correctStudentLoanOrder()
  });
})

