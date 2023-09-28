const { submitOrder, fetchOrder } = require('../src/node-client')

const examplePayload = {
  "customer": {
    "uuid": "fa1bbcee-3fa1-464d-aa9b-570596c7f069",
    "person": {
      "name": "Wiktor",
      "surname": "Serafin",
      "dateOfBirth": [1994, 4, 9],
      "gender": "MALE",
      "nationalIdentificationNumber": "94040934337",
      "age": 26
    },
    "student": false
  },
  "status": "NEW"
}

describe('HTTP Client based Customer Verification', () => {
  it('should set order status to verified when passing correct customer', async () => {
    const { body: orderID, statusCode: statusCodeSubmit } = await submitOrder(examplePayload)
    expect(statusCodeSubmit).toBe(200)
    expect(orderID).toBeDefined()
    
    const { body: orderObject, statusCode: statusCodeFetch } = await fetchOrder(orderID)
    expect(statusCodeFetch).toBe(200)
    expect(orderObject.status).toEqual('VERIFIED')
    // console.log(orderObject)
  });

  it('should set order status to failed when passing incorrect customer', async () => {
    const request = submitOrder({})
    return expectAsync(request).toBeRejected()
  }); 
});
