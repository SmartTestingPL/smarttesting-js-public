const assert = require('assert')
const chai = require('chai')
const expect = chai.expect

describe('NODE.JS ASSERT', () => {
  it('calculator: should add correctly @assert', () => {
    assert.equal(1 + 2, 3, '1+2 is 3, dude!')
    assert.strictEqual(1 + 2, 3, '1+2 is 3, dude!')
    assert.notEqual(1 + 2, 1500, 'should not be, dude!')
    assert.notStrictEqual(1 + 2, 1500, 'should not be, dude!')

    expect(1 + 2 == 3, '1+2 is 3, dude!').to.be.true
  })

  xit('(xit) skipped - never gets run @assert', () => {
    assert.fail()
  })
})
