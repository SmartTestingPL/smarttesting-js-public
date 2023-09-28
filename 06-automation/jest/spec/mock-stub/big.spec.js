import { bigFn } from "./big";

// - mocking only the small dependency
// jest.mock('./small') // - this mocking removes console.logs from 'small' module
// but leaves console.logs from 'big' module

// - mocking the whole thing (makes not much sense)
jest.mock('./big') // - this mocking removes console.logs from 'small' module

// - stubbing the small dependency (providing alternate impl)
// jest.mock('./small', () => ({
//   smallFn: () => console.log("I'm in da mock!")
// }))

describe('big function', () => {
  it('should work - mock', () => {
    expect(bigFn()).toBe(undefined)
  })
})
