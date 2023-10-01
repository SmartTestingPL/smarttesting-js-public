class LoanCreatedEvent {
    /** @type {string} */
    loanUUID

    constructor({ uuid }){
        this.loanUUID = uuid
    }
}

module.exports = {
    LoanCreatedEvent
}
