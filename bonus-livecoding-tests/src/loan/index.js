// export * from './LoanType'
module.exports = {
  ...require('./Loan'),
  ...require('./LoanService'),
  ...require('./LoanType')
}
