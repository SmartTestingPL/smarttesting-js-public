const { LoanService } = require("./LoanService")
const { LoanOrderStubBuilder } = require("./LoanOrderStubBuilder")
const { CommissionValidationException } = require("./validation")
const { Promotion } = require("../order/promotion")
const { EventEmitter } = require('../event/EventEmitter')
 
class TestPostgresAccessor {
	updatePromotionStatistics(/** @type {string} */ promotionName) {
		// do nothing
	}

	updatePromotionDiscount(/** @type {string} */ promotionName, /** @type {number} */ newDiscount) {
		// do nothing
	}

	getValidPromotionsForDate(/** @type {Date} */ localDate) {
        return [
            new Promotion({ name: "10", discount: 10 }),
            new Promotion({ name: "20", discount: 20 }),
        ]
	}
}

describe('LoanService', () => {
    const loanBuilder = new LoanOrderStubBuilder()

    const eventEmitter = new EventEmitter();

    // object literal which defines only the things we need, duck typing for the win lol
    const mongoDbAccessor = {
        getMinCommission(){ return 200 }
    }

    const postgresAccessor = new TestPostgresAccessor()

    const loanService = new LoanService(eventEmitter, mongoDbAccessor, postgresAccessor)

    it('should create loan', () => {
        const loanOrder = loanBuilder.create().get()
        const loan = loanService.createLoan(loanOrder, 3)

        expect(loan.uuid).not.toBeNull()
    })

    it('should emit event when loan created', () => {
        const spy = spyOn(eventEmitter, 'emit').and.callThrough()
    
        const loanOrder = loanBuilder.create().get()
        loanService.createLoan(loanOrder, 3)

        expect(spy).toHaveBeenCalledTimes(1)
        // sprawdzamy, czy emitter został wywołany z odpowiednim eventem - sprawdzamy loanUUID
        const firstEvent = spy.calls.argsFor(0)[0]
        expect(firstEvent.uuid).not.toBeNull()
    })

    const commissionTestCases = [null, 0, -1, 199]
    for (const commission of commissionTestCases){
        it(`should throw exception for commission = ${commission}`, () => {
            expect(() => {
                const loanOrder = loanBuilder.create()
                    .withCommission(commission)
                    .get()
                loanService.createLoan(loanOrder, 5)
            }).toThrowError(CommissionValidationException)
        })
    }

    it('should not throw exception if empty promotions', () => {
        expect(() => {
            const loanOrder = loanBuilder.create()
                .withPromotions([])
                .get()
            loanService.createLoan(loanOrder, 6)
        }).not.toThrow()
    })

    it('should remove incorrect promotions', () => {
        const loanOrder = loanBuilder.create()
            .withPromotions([
                new Promotion({ name: "promotion not in DB", discount: 55 })
            ])
            .get()

		loanService.updatePromotions(loanOrder)

		expect(loanOrder.promotions.length).toEqual(0)
    })
})
