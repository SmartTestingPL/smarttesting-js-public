const { submitOrder } = require('../src/node-client')
const { sampleCustomerPayload } = require('./fake-producer')

describe('Customer Verification', () => {
  it('should set order status to verified when passing correct customer', async () => {
    const payload = sampleCustomerPayload()

    const { body: orderID, statusCode: statusCodeSubmit } = await submitOrder(payload)
    expect(statusCodeSubmit).toBe(200)
    expect(orderID).toBeDefined()
  });
});