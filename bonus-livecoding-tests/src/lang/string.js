const extremelyNaive__isAlpha = (phrase) => {
  return /^[a-z]+$/i.test(phrase)
}

const isTrue = value => value === 'true'

module.exports = {
  isTrue,
  extremelyNaive__isAlpha,
}
