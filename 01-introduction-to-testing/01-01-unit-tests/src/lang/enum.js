const assertEnumValue = (value, enumeration) => {
  if (!Object.values(enumeration).includes(value)){
    throw new TypeError(`Given "${value}" beyond allowed values: ${Object.values(enumeration)}`)
  }
}

module.exports = {
  assertEnumValue
}
