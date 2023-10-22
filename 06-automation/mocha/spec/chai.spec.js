const chai = require('chai')

describe('CHAI', () => {

  describe('CHAI: assert - same as node.js assert', () => {
    const assert = chai.assert

    it('calculator: should add correctly', () => {
      assert.equal(1 + 2, 3)
      // equal cannot be chained

      assert.include([1, 2, 3], 1)
      assert.notInclude([1, 2, 3], 4)

      assert.isFunction(() => {})

      assert.throws(() => { throw ('Kaboom!') })
    })
  })

  describe('CHAI: should', () => {
    chai.should()

    it('calculator: should add correctly', () => {
      (1 + 2).should.equal(3).and.not.equal(4);

      [1, 2, 3].should.contain(1).and.not.contain(4);

      (() => { }).should.be.a('function')

      // (() => { throw ('Kaboom!') }).should
    })
  })

  describe('CHAI: expect', () => {
    const expect = chai.expect

    it('calculator: should add correctly', () => {
      expect(1 + 2).to.equal(3).and.not.to.equal(4)

      expect([1, 2, 3]).to.contain(1).and.not.contain(4);

      expect(() => { }).to.be.a('function')

      expect(() => { throw ('Kaboom!') }).to.throw()
    })
  })
})
