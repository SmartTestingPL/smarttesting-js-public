describe('adding', () => {
  it("should return proper results", function () {
    // failure messages
    expect(1 + 2).toEqual(3, '1+2 is 3, dude!') // this error msg doesn't get displayed, for some reason
    expect(1 + 2).toBe(3, '1+2 is 3 dude!') // this error msg gets displayed
    expect(1 + 2).not.toEqual(1500, 'should not be, dude!') // this error msg gets displayed
  })

  it("should fail on strings", function () {
    expect(1 + '2').toEqual('12')
  })
})
