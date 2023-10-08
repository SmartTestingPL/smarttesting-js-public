const { submitOrder, fetchOrder } = require('./web-client')

const examplePayload = {
  "customer": {
    "uuid": "fa1bbcee-3fa1-464d-aa9b-570596c7f069", "person": {
      "name": "Wiktor",
      "surname": "Serafin",
      "dateOfBirth": [1994, 4, 9],
      "gender": "MALE",
      "nationalIdentificationNumber": "94040934337",
      "age": 26
    }, "student": false
  }, "status": "NEW"
}


;(async () => {
  const orderID = await submitOrder(examplePayload)
  console.log(orderID)

  const orderObject = await fetchOrder(orderID)
  console.log(orderObject)
})()
