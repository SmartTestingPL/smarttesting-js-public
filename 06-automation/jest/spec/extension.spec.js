import * as assert from 'assert'

xdescribe('vscode extension', () => {
  it('always passes', () => {
    assert.ok(true)
  })

  it('always fails', () => {
    assert.ok(false)
    assert.fail()
  })
})
