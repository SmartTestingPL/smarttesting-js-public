const expect = require('chai').expect
const sinon = require('sinon')

const { delayed } = require('../../utils/promises')

it('docs test', () => {
  var clock = sinon.useFakeTimers({
    now: 1483228800000,
    toFake: ["setTimeout", "nextTick"]
  });

  var called = false;

  process.nextTick(function () {
    called = true;
  });

  clock.runAll(); //forces nextTick calls to flush synchronously
  expect(called).to.be.true; //true
})

describe('SINON FAKE TIMERS', () => {
  let ft
  beforeEach(() => {
    ft = sinon.useFakeTimers()
  })

  afterEach(() => {
    ft.restore()
  })

  it('tick advances time manually', (done) => {
    const spy = sinon.spy()

    setTimeout(() => {
      spy()
    }, 100)

    // not called yet
    ft.tick(99)
    expect(spy.getCalls().length).to.equal(0)

    // already called
    ft.tick(1)
    expect(spy.getCalls().length).to.equal(1)

    done()
  })

  describe('PROMISES', () => {

    it('tick advances time manually - with simple Promises', (done) => {
      const spy = sinon.spy()

      const p = delayed(100)
        .then(spy)
        .then(() => {
          expect(spy.getCalls().length).to.equal(1)
        })
        .finally(done)

      // not called yet
      ft.tick(99)
      expect(spy.getCalls().length).to.equal(0)

      // already called
      ft.tick(1)
    })

    it('tick advances time manually - with simple Async/Await', async () => {
      const spy = sinon.spy()

      const p = delayed(100)
        .then(spy)

      // not called yet
      ft.tick(99)
      expect(spy.getCalls().length).to.equal(0)

      // already called
      ft.tick(1) // (!)
      // IF ABOVE LINE GETS COMMENTED OUT, TEST NEVER COMPLETES (promise never gets resolved, await never completes)
      await p
      expect(spy.getCalls().length).to.equal(1)
    })
  })
})
