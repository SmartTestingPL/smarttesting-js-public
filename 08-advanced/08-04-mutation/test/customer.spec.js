const assert = require('assert')
const { verifyID, verifyAge } = require('../src/customer')

describe('Customer', () => {

  describe('National ID Verification', () => {
    it('should fail on invalid type ', () => {
      assert.equal(verifyID({}), false)
    })
  
    it('should fail on invalid value', () => {
      assert.equal(verifyID({ id: '00000000000' }), false)
    })
  
    it('should fail on valid ID', () => {
      assert.equal(verifyID({ id: 11223345678 }), true)
    })
  })

  describe('Age Verification', () => {
    it('should succeed on age within boundary', () => {
      assert.ok(verifyAge({ age: 25 }))
    })

    it('should fail when age below the threshold', () => {
      assert.ok(!verifyAge({ age: 0 }))
    })

    it('should fail when age above the threshold', () => {
      assert.ok(!verifyAge({ age: 100 }))
    })

    it('should fail on lower boundary', () => {
      assert.ok(!verifyAge({ age: 18 }))
    })

    it('should fail on upper boundary', () => {
      assert.ok(!verifyAge({ age: 99 }))
    })
  })
})
