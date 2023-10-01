const { now } = require("../lang/time")
const { Promotion } = require("../order/promotion")
const { Loan } = require("./Loan")
const { LoanOrderStubBuilder } = require("./LoanOrderStubBuilder")

describe('Loan', () => {
    const loanBuilder = new LoanOrderStubBuilder()

    it('should create loan', () => {
        const loanOrder = loanBuilder.create()
            .withAmount(3000)
            .withInterestRate(5)
            .withCommission(200)
            .get()
        const loan = new Loan({ loanOrder, numberOfInstallments: 6 })

        expect(loan.loanOpenedDate.getDate()).toEqual(now().getDate())
        expect(loan.numberOfInstallments).toEqual(6)
        expect(loan.amount).toEqual(3350)
    })

    it('should calculate installment amount', () => {
        const loanOrder = loanBuilder.create()
            .withAmount(3000)
            .withInterestRate(5)
            .withCommission(200)
            .get()
        const loanInstallment = new Loan({ loanOrder, numberOfInstallments: 6 }).installmentAmount
        expect(loanInstallment).toEqual(558.33)
    })

    it('should apply promotion discount', () => {
        const loanOrder = loanBuilder.create()
            .withAmount(3000)
            .withInterestRate(5)
            .withCommission(200)
            .withPromotions([
                new Promotion({ name: "Test 10", discount: 10 }),
                new Promotion({ name: "Test 20", discount: 20 }),
            ])
            .get()
		const loan = new Loan({ loanOrder, numberOfInstallments: 6 })

		expect(loan.amount).toEqual(3320)
		expect(loan.installmentAmount).toEqual(553.33)
    })

    it('should apply fixed discount if promotion discount sum higher than threshold', () => {
        const loanOrder = loanBuilder.create()
            .withAmount(2000)
            .withInterestRate(5)
            .withCommission(300)
            .withPromotions([
                new Promotion({ name: "60", discount: 60 }),
                new Promotion({ name: "300", discount: 300 }),
            ])
            .get()

		// Base amount: 2400
		const loanAmount = new Loan({ loanOrder, numberOfInstallments: 6 }).amount

		expect(loanAmount).toEqual(2040);
    })
})
