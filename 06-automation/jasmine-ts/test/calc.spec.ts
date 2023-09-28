import { add } from "../src";

describe('calc', () => {
  it('should add', () => {
    expect(add(1, 2)).toBe(3)
  });

  it('should also add (and should not compile :P)', () => {
    expect(add('1', '2')).toBe(3) // this should not compile (!)
  });
});
