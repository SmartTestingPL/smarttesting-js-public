const chai = require('chai')

const { StringSearchEngine } = require('../src/string-search-engine')

const names = [
  "Janna Effertz",
  "Presley Moen",
  "Klaus Strömm",
  "Maksymilian Kowalski",
  "Devon Schuppe Jr.",
  "Bennetta Pacócha",
  "Jan Miłowski",
  "Destin Hoppe",
  "Hans Grünn",
  "Tristian Gęślik",
]

const searchByNames = StringSearchEngine(names)

describe('String Search Engine', () => {
  chai.should()

  it('should search strings by phrases', () => {
    searchByNames('Jan').should.have.lengthOf(2)
    searchByNames('jan').should.have.lengthOf(0)
    searchByNames('jan', { caseInsensitive: true }).should.have.lengthOf(2)

    searchByNames('ges').should.have.lengthOf(0)
    searchByNames('gęś').should.have.lengthOf(0)
    searchByNames('gęś', { caseInsensitive: true }).should.have.lengthOf(1)
  })

  const cases = [{
    phrase: "Jan",
    length: 2,
  }, {
    phrase: "jan",
    length: 0,
  }, {
    phrase: "jan",
    length: 2,
    options: { caseInsensitive: true }
  }, {
    phrase: "ges",
    length: 0,
  }, {
    phrase: "gęś",
    length: 0,
  }, {
    phrase: "gęś",
    length: 1,
    options: { caseInsensitive: true }
  }]

  cases.forEach(({ phrase, length, options }) => {
    const optsPhrase = options ? ` with options ${JSON.stringify(options)}` : ''
    it(`Phrase ${phrase} should be found ${length} times${optsPhrase}`, () => {
      searchByNames(phrase, options).should.have.lengthOf(length)
    })
  })
})

/* OUTPUT

    - should search strings by phrases
    ✓ Phrase Jan should be found 2 times
    ✓ Phrase jan should be found 0 times
    ✓ Phrase jan should be found 2 times with options {"caseInsensitive":true}
    ✓ Phrase ges should be found 0 times
    ✓ Phrase gęś should be found 0 times
    ✓ Phrase gęś should be found 1 times with options {"caseInsensitive":true}

*/
