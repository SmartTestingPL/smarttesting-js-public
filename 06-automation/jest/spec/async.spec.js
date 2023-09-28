describe('JEST ASYNC', () => {
  it('test should await if a PROMISE IS RERTURNED', () => {
    expect.assertions(1);

    const delayedPromise = new Promise((res, rej) => {
      setTimeout(() => res(125), 0)
    })

    delayedPromise
      .then(data => expect(data).toBe(125))

    return delayedPromise
  })

  it('ASYNC test should await on AWAIT', async () => {
    expect.assertions(1);

    const delayedPromise = new Promise((res, rej) => {
      setTimeout(() => res(125), 0)
    })

    delayedPromise
      .then(data => expect(data).toBe(125))

    await delayedPromise
  })

  it('test should await if DONE cb is called', done => {
    expect.assertions(1);

    const delayedPromise = new Promise((res, rej) => {
      setTimeout(() => res(125), 0)
    })

    delayedPromise
      .then(data => expect(data).toBe(125))
      .finally(done)
  })
})
