const unpackResponse = (contentStr = '') => {
  const idx = contentStr.indexOf('data:')
  return contentStr.substr(idx + 'data:'.length).trim()
}

module.exports = {
  unpackResponse,
}
