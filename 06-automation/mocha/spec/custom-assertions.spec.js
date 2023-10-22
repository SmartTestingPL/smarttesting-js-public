const assert = require('assert')

describe('Custom Assertions', () => {
  describe('NODE.JS ASSERT', () => {

    it('coercion, equal: 2 vs "2", true vs 1, "" + {} vs "" @assert', () => {
      assert.equal(2, "2")
      assert.equal(true, 1)
      assert.equal('' + {}, {})
    })

    it('coercion, not equal: 2 vs "2", true vs 1, "" + {} vs "" @assert', () => {
      assert.notStrictEqual(2, "2")
      assert.notStrictEqual(true, 1)
      assert.notStrictEqual('' + {}, {})
    })
  })

  it('is same reference @assert', () => {
    // different references
    const object = { value: 100 }
    const object2 = { value: 100 }

    // both deprecated in favor of strictEqual
    assert.equal(object, object) // same reference
    assert.notEqual(object, object2) // different reference

    // difference only in allowing coercion or not
    assert.deepEqual(object, object2) // deprecated
    assert.deepStrictEqual(object, object2)
  })

  it('is function @assert', () => {
    function doSomething(){}

    assert.equal(typeof doSomething, "function")
  })

  it('is iterator @assert', () => {
    function isIterator(item){
      return item[Symbol.iterator] !== undefined
    }
    assert.equal(isIterator([]), true)
    assert.equal(isIterator(new Set()), true)
    assert.equal(isIterator(new Map()), true)
    const generator = function* () { yield 125 }
    assert.equal(isIterator(generator()), true)
  })

  it('is function with length @assert', () => {
    const fn0 = () => {}
    assert.equal(fn0.length, 0)

    const fn1 = x => x**2
    assert.equal(fn1.length, 1)

    const fnargs = (x, ...args) => args.reduce((sum, a) => sum + a, x)
    assert.equal(fnargs.length, 1)
  })

  it('is function async @assert', () => {
    async function delay() {
      const value = await Promise.resolve(125)
      return value
    }

    // https://davidwalsh.name/javascript-detect-async-function
    const isAsync = delay.constructor.name === "AsyncFunction"

    assert.equal(isAsync, true)
  })
})
