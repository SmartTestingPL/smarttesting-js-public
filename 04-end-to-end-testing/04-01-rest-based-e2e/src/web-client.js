const { unpackResponse } = require('./utils')

// https://jakearchibald.com/2017/async-iterators-and-generators/#making-streams-iterate
async function* streamAsyncIterator(stream) {
  // Get a lock on the stream
  const reader = stream.getReader();

  try {
    while (true) {
      // Read from the stream
      const { done, value } = await reader.read();
      // Exit if we're done
      if (done) return;
      // Else yield the chunk
      yield value;
    }
  }
  finally {
    reader.releaseLock();
  }
}

const exhaustStream = async (reader) => {
  let content = ''
  for await (const chunk of streamAsyncIterator(reader)) {
    content += String.fromCharCode.apply(null, chunk);
  }
  return content
}

const submitOrder = async (orderData) => {
  const response = await fetch('http://localhost:9091/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  })
  const reader = response.body
  const content = await exhaustStream(reader)
  return unpackResponse(content)
}

const fetchOrder = async (orderID) => {
  const response = await fetch(`http://localhost:9091/orders/${orderID}`, {
    headers: {
      'Content-Type': 'application/json'
    },
  })
  const reader = response.body
  const content = await exhaustStream(reader)
  return JSON.parse(unpackResponse(content))
}

module.exports = {
  submitOrder,
  fetchOrder,
}
