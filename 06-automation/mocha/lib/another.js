var { myObj } = require('./my')

var anotherMine = () => {
  myObj.myFn()
  myObj.myFn()
  myObj.myFn()
}

module.exports = {
  anotherMine
}
