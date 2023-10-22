describe('JASMINE SPIES', () => {
  it('anonymous spy remembers its calls', () => {
    const anonymousSpy = jasmine.createSpy()
    const result = anonymousSpy()
    expect(anonymousSpy).toHaveBeenCalled()
  })

  it('should NOT call the wrapped function', () => {
    let value = 0
    const fn = () => {
      value = 125
      return value
    }

    const spy = jasmine.createSpy('my spy', fn)
    const result = spy()
    expect(spy).toHaveBeenCalled()
    expect(value).toEqual(0)
    expect(result).toEqual(undefined) // function not called, so nothing returned
  })

  it('should call the wrapped function with .andCallThrough()', () => {
    let value = 0
    const fn = () => {
      value = 125
      return value
    }

    const spy = jasmine.createSpy('my spy', fn).and.callThrough()
    const result = spy()
    expect(spy).toHaveBeenCalled()
    expect(value).toEqual(125)
    expect(result).toEqual(125)
  })

  it('should NOT call the wrapped object method', () => {
    let value = 0
    const object = {
      update(){
        value = 125
        return value
      }
    }

    const spy = spyOn(object, 'update')
    const result = object.update()
    expect(spy).toHaveBeenCalled()
    expect(value).toEqual(0)
    expect(result).toEqual(undefined) // function not called, so nothing returned
  })

  it('should call the wrapped object method with .andCallThrough()', () => {
    let value = 0
    const object = {
      update(){
        value = 125
        return value
      }
    }

    const spy = spyOn(object, 'update').and.callThrough()
    const result = object.update()
    expect(spy).toHaveBeenCalled()
    expect(value).toEqual(125)
    expect(result).toEqual(125)
  })

  describe('returning values', () => {

    it('should return arbitrary values', () => {
      const spy = jasmine.createSpy()
      expect(spy()).toBe(undefined)

      spy.and.returnValue(125)
      expect(spy()).toBe(125)

      spy.and.returnValues(5, 25, 125);
      expect(spy()).toBe(5)
      expect(spy()).toBe(25)
      expect(spy()).toBe(125)
      expect(spy()).toBe(undefined) // end of list
    })

    it('should return arbitrary ASYNC values', (done) => {
      const spy = jasmine.createSpy()

      spy.and.returnValues(Promise.resolve(1311));
  
      spy()
        .then(data => expect(data).toBe(1311))
        .finally(done)
    })
  })
})
