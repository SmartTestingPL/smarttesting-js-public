const sinon = require('sinon')
const chai = require('chai')
chai.should()
const expect = chai.expect

describe('SINON stubs', () => {
  it('allow to define certain call return values', () => {
    const stub = sinon.stub()
    stub
      .onFirstCall().returns(Math.PI)
      .onSecondCall().returns(Math.E)
      .throws(new Error('DAMN YOU CHEESECAKE!'))

    stub().should.equal(Math.PI, 'PI should re returned')
    stub().should.equal(Math.E, 'Euler should be returned')
    // stub() will throw outside a try-catch - could not test it this way!
    // need to remov parenthesis
    stub.should.throw('DAMN YOU CHEESECAKE!', 'cheesecake should be thrown')
  })

  it('should return 42, then 52, then always 62 until the end of world', () => {
    const stub = sinon.stub()
    stub
      .onFirstCall().returns(42)
      .onSecondCall().returns(52)
      .returns(62)

      stub.resetHistory()

    expect(stub()).to.equal(42)
    expect(stub()).to.equal(52)
    expect(stub()).to.equal(62)
    expect(stub()).to.equal(62)
    expect(stub()).to.equal(62)
  })
})
