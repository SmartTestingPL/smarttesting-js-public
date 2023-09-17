/**
 * Reprezentuje promocję dla oferty pożyczek.
 */
class Promotion {
  /** @type {string} */
  name

  /** @type {number} */
  discount

  constructor({ name, discount }){
    this.name = name
    this.discount = discount
  }
}

module.exports = {
  Promotion,
}
