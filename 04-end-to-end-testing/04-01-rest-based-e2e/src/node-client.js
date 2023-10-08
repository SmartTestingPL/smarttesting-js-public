// const request = require('request')
const rp = require('request-promise');
const { unpackResponse } = require('./utils')

const submitOrder = async (orderData) => {
  const response = await rp.post('http://localhost:9091/orders', {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData),
    resolveWithFullResponse: true,
  })

  return {
    body: unpackResponse(response.body),
    statusCode: response.statusCode
  }
}

const fetchOrder = async (orderID) => {
  const response = await rp.get(`http://localhost:9091/orders/${orderID}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    resolveWithFullResponse: true,
  })

  return {
    body: JSON.parse(unpackResponse(response.body)),
    statusCode: response.statusCode
  }
}

module.exports = {
  submitOrder,
  fetchOrder,
}
