const { v4: uuid } = require('uuid')
const { now } = require('../lang/time');
const { LoanOrder } = require('./LoanOrder')

const { exampleStudent } = require('./test-base')

/**
 * Przykład zastosowania kodu bazowego w celu zwiększenia czytelności i umożliwienia reużycia kodu.
 * Przykład testowania stanu.
 */
describe('LoanOrder', () => {

	// Testowanie stanu
	it('should add manager promo', () => {
		const loanOrder = new LoanOrder({
			orderDate: now(),
			customer: exampleStudent(),
		});
		const managerUuid = uuid();

		loanOrder.addManagerDiscount(managerUuid);

    	// (przypomnienie) toBe/toEqual - z prymitywami - jeden pies 🙃
		expect(loanOrder.promotions.length).toBe(1);
		expect(loanOrder.promotions.length).toEqual(1);
		expect(loanOrder.promotions[0].name).toContain(managerUuid);
		expect(loanOrder.promotions[0].discount).toEqual(50);
  })

})
