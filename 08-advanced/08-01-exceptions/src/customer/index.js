// export * from './Customer'
// export * from './Person'

module.exports = {
  ...require('./Customer'),
  ...require('./Person'),
}
