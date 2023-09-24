const { now } = require('../lang/time');
const { Customer } = require('../customer')
const { LoanOrderService } = require('./LoanOrderService')
const { LoanOrderAssert } = require('./LoanOrderAssert')

const { exampleStudent } = require('./test-base')

/**
 * Zawiera przykłady różnych sposobów setupu i tear-downu testów
 * i przykłady zastosowania stubów i mocków.
 */
describe('LoanOrderService', () => {

  // Metoda setupująca frameworku wywoływana raz przed wywołaniem którejkolwiek metody testowej w klasie
  beforeAll(() => {
    console.log("Running the tests.")
  })

  	// Tworzenie obiektów stub/ mock

	// Mock, który będzie wykorzystywany później do weryfikacji interakcji
	const postgresAccessor = jasmine.createSpyObj('postgresAccessor', ['updatePromotionStatistics', 'updatePromotionDiscount'])

	// Ten obiekt tak naprawdę jest wyłącznie stubem (nie używamy go do weryfikacji interakcji),
	// a to, że jest tworzony metodą `mock(...)` to wyłącznie specyfika frameworku.
	// Np. w Spocku użylibyśmy wywołania `Stub(MongoDBAccessor)`
  const mongoDbAccessor = jasmine.createSpyObj('mongoDbAccessor', ['getPromotionDiscount'])
  
	// Alternatywne sposoby setupu testów: pole
	const loanOrderService = new LoanOrderService(postgresAccessor, mongoDbAccessor);

  // Metoda Tear-down wywoływana po zakończeniu wszystkich testów w klasie
  afterAll(() => {
    console.log("Finished running the tests.");
  })
  
  // albo każda metoda robi własną zmienną `student` albo używają jednej.
  // kwestia preferencji.
  /** @type {Customer} */
  let student;

  beforeEach(() => {
    student = exampleStudent()

    // Stubowanie metody getPromotionDiscount(...)
    mongoDbAccessor.getPromotionDiscount.withArgs("Student Promo").and.returnValue(10)
  })
  
  // Testowanie wyniku operacji
  it('should create student loan order', () => {
    const loanOrder = loanOrderService.studentLoanOrder(student)

    expect(loanOrder.orderDate.getDate()).toEqual(now().getDate())

    const filteredPromotions = loanOrder.promotions
      .filter(promotion => promotion.name === "Student Promo")
    expect(filteredPromotions.length).toEqual(1)
    expect(loanOrder.promotions.length).toEqual(1)
    expect(loanOrder.promotions[0].discount).toEqual(10)
  });

  it('shouldUpdatePromotionStatistics', () => {
		loanOrderService.studentLoanOrder(student);

    // Weryfikacja interakcji z użyciem obiektu, który jest też stosowany jako stub
    expect(postgresAccessor.updatePromotionStatistics).toHaveBeenCalledWith("Student Promo")

    // Weryfikacja tego, że dana interakcja nie wystąpiła
    expect(postgresAccessor.updatePromotionDiscount).not.toHaveBeenCalledWith("Student Promo")
  })

  // Przykład zastosowania AssertObject Pattern
  it('(assert object) should create student loan order', () => {
    const loanOrder = loanOrderService.studentLoanOrder(student)

		const orderAssert = new LoanOrderAssert({ loanOrder });
		orderAssert.registeredToday();
		orderAssert.hasPromotion("Student Promo");
		orderAssert.hasOnlyOnePromotion();
		orderAssert.firstPromotionHasDiscountValue(10);
  });

  // Przykład zastosowania AssertObject Pattern z chainowaniem asercji
  it('(chained) should create student loan order', () => {
    const loanOrder = loanOrderService.studentLoanOrder(student)

		LoanOrderAssert.then(loanOrder).registeredToday()
				.hasPromotion("Student Promo")
				.hasOnlyOnePromotion()
				.firstPromotionHasDiscountValue(10);
  });

  // Przykład zastosowania AssertObject Pattern z użyciem metody wrappującej chain asercji
  it('(chained assert object) should create student loan order', () => {
    const loanOrder = loanOrderService.studentLoanOrder(student)

    LoanOrderAssert.then(loanOrder).correctStudentLoanOrder()
  });

})
