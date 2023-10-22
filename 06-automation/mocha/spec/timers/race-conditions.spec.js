// const sinon = require('sinon')
// const assert = require('assert')
// // const chai = require('chai')
// // const assert = chai.assert

// const { delayed } = require('../../utils/promises')

// describe('SINON FAKE TIMERS', () => {

//   let ft
//   beforeEach(() => {
//     ft = sinon.useFakeTimers()
//   })

//   afterEach(() => {
//     ft.restore()
//   })

//   let customersDelayTime, productsDelayTime
//   const CUSTOMERS_RESPONSE = 'CUSTOMERS_DATA'
//   const PRODUCTS_RESPONSE = 'PRODUCTS_DATA'
//   const getCustomers = () => delayed(customersDelayTime).then(() => CUSTOMERS_RESPONSE)
//   const getProducts = () => delayed(productsDelayTime).then(() => PRODUCTS_RESPONSE)

//   describe('RACE CONDITIONS', () => {

//     [{
//       customersDelay: 500,
//       productsDelay: 500,
//     }, {
//       customersDelay: 500,
//       productsDelay: 1000,
//     }, {
//       customersDelay: 1000,
//       productsDelay: 500,
//     }].forEach(({ customersDelay, productsDelay }) => {
//       customersDelayTime = customersDelay
//       productsDelayTime = productsDelay

//       it(`fetching customers (${customersDelay}ms) and products (${productsDelay}ms)`, async () => {
//         // const listener = function (err) { assert.fail(err) }
//         // const x = process.on('unhandledRejection', listener)
//         // // x.removeListener('unhandledRejection', listener)
//         // x.removeAllListeners('unhandledRejection')
//         // console.log( x.listenerCount('unhandledRejection') )
//         try {

//         const doSomething = sinon.spy()
//         let customers, products

//         // usually takes 0,5s
//         var c = getCustomers()
//           .then(data => {
//             customers = data
//           })

//         // usually takes 1s
//         var p = getProducts()
//           .then(data => {
//             products = data
//             doSomething(customers, products)
//             assert.deepEqual(doSomething.getCalls()[0].args, ['CUSTOMERS_DATA', 'PRODUCTS_DATA'])
//           })

//         assert.equal(doSomething.getCalls().length, 0)
//         ft.tick(500)
//         await c
//         ft.tick(500)
//         await p
//         ft.runAll()

//         return Promise.all([p, c])

//         } catch (err) {
//           assert.fail(err)
//         }
//       })
//     })

//   })
// })
