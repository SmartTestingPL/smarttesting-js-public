const { Person, Customer, GENDER } = require('../customer')
const { LoanOrder } = require('../order/LoanOrder')
const { now } = require('../lang/time')
const { v4: uuid } = require('uuid')

const createStubCustomer = () => new Customer({
    uuid: uuid(),
    person: new Person({
        name: "Maria",
        surname: "Kowalska",
        dateOfBirth: new Date(1989, 3, 10),
        gender: GENDER.FEMALE,
        nationalIdentificationNumber: "89031013409"
    })
})

class LoanOrderStubBuilder {
    stub

    create(){
        this.stub = new LoanOrder({
            orderDate: now(),
            amount: 2000,
            interestRate: 5,
            commission: 300,
            customer: createStubCustomer()
        })
        return this
    }

    withAmount(amount){
        this.stub.amount = amount
        return this
    }

    withInterestRate(interestRate){
        this.stub.interestRate = interestRate
        return this
    }

    withCommission(commission){
        this.stub.commission = commission
        return this
    }

    withPromotions(promotions){
        for (const p of promotions){
            this.stub.promotions.push(p)
        }
        return this
    }

    get(){
        return this.stub
    }
}


module.exports = {
    LoanOrderStubBuilder
}