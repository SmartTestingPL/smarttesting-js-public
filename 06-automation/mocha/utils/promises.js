const delayed = (ms) =>
  new Promise((res) => {
    setTimeout(res, ms)
  })

module.exports = {
  delayed,
}
