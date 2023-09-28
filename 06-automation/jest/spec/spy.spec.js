describe('JEST SPIES', () => {
  it('anonymous spy remembers its calls', () => {
    const anonymousSpy = jest.fn()
    const result = anonymousSpy()
    expect(anonymousSpy).toHaveBeenCalled()
  })

  test('should call the wrapped function anyway', () => {
    let value = 0
    const fn = () => {
      value = 125
      return value
    }

    const spy = jest.fn(fn)
    const result = spy()
    expect(spy).toHaveBeenCalled()
    expect(value).toEqual(125)
    expect(result).toEqual(125)
  })

  test('should call the wrapped object method anyway', () => {
    let value = 0
    const object = {
      update(){
        value = 125
        return value
      }
    }

    const spy = jest.spyOn(object, 'update')
    const result = object.update()
    expect(spy).toHaveBeenCalled()
    expect(value).toEqual(125)
    expect(result).toEqual(125)
  })

  describe('returning values', () => {

    it('should return arbitrary values', () => {
      const spy = jest.fn()
  
      expect(spy()).toBe(undefined)

      spy
        .mockReturnValueOnce(5)
        .mockReturnValueOnce(25)
        .mockReturnValue(125)
  
        expect(spy()).toBe(5)
        expect(spy()).toBe(25)
        expect(spy()).toBe(125)
        expect(spy()).toBe(125)
    })

    it('should return arbitrary ASYNC values', (done) => {
      const spy = jest.fn()

      spy.mockResolvedValueOnce(1311)
  
      spy()
        .then(data => expect(data).toBe(1311))
        .finally(done)
    })

  })
})
