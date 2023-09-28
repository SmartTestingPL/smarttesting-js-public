const assert = require('assert')

describe('node.js assert', () => {
  it('should have basic assertions working', () => {
    assert.ok(true)

    const value = { a: 1 } 
    assert.equal(value, value) // comparing references
    // (Compared values have no visual difference. - means the content is the same, but reference is different)

    assert.deepEqual(value, { a: '1' })

    // assert.deepStrictEqual(value, { a: '1' }) // fails
  })

  xit('(xit) skipped - never gets run', () => {
    assert.fail()
  })
})
