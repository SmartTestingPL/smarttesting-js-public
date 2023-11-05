const verifyID = (customer) => {
  const id = customer.id
  const stringId = '' + parseInt(id)
  return stringId.length == 11
}

const verifyAge = (customer) => {
  const age = customer.age
  if (age < 0){
    return false
  }
  else if (age > 18 && age < 99) {
    return true
  } else {
    return false
  }
}

module.exports = {
  verifyID,
  verifyAge,
}
