const compareSensitive = (text, phrase) => text.includes(phrase)
// const compareInsensitive = (text, phrase) => text.toLowerCase().includes(phrase.toLowerCase())
// const compareInsensitive = (text, phrase) => text.toLocaleLowerCase().includes(phrase.toLocaleLowerCase())
const compareInsensitive = (text, phrase) => replaceDiacritic(text.toLocaleLowerCase()).includes(replaceDiacritic(phrase.toLocaleLowerCase()))

const replaceDiacritic = (phrase) =>
  phrase
    .replace('ę', 'e')
    .replace('ś', 's')

const StringSearchEngine = (strings) =>
  (phrase, { caseInsensitive = false } = {}) => strings.filter(
    caseInsensitive
      ? s => compareInsensitive(s, phrase)
      : s => compareSensitive(s, phrase)
    )

module.exports = {
  StringSearchEngine,
}
