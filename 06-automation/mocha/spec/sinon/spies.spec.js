const sinon = require('sinon')
const assert = require('assert')

describe('SINON + sinon.assert', () => {
  it('anonymous spy called once', () => {
    const spy = sinon.spy()
    spy()
    sinon.assert.calledOnce(spy)
  })

  it('anonymous spy called thrice', () => {
    const spy = sinon.spy()
    spy()
    spy()
    spy()
    sinon.assert.calledThrice(spy)
    sinon.assert.alwaysCalledWithExactly(spy) // no params

    assert.equal(spy.returnValues.length, 3)
  })

  it('anonymous spy never called', () => {
    const spy = sinon.spy()
    sinon.assert.notCalled(spy)
  })

  it('anonymous spy called, but never with arg 125', () => {
    const spy = sinon.spy()
    spy(Math.PI)
    sinon.assert.neverCalledWith(spy, 125)
  })

  it('anonymous spy called with parameters', () => {
    const spy = sinon.spy()
    spy(125)
    sinon.assert.calledWith(spy, 125)
  })

  it('anonymous spy called as constructor', () => {
    const spy = sinon.spy()
    const unknown  = new spy()
    sinon.assert.calledWithNew(spy)
  })

  describe('spying on object methods', () => {
    var { myFn, myObj } = require('../../lib/my')
    var { anotherMine } = require('../../lib/another')

    it('mordo spaje', () => {
      const spy = sinon.spy(myObj, 'myFn')
      myObj.myFn(125)

      sinon.assert.calledOnce(spy)

      spy.restore()
    })
  })
})
