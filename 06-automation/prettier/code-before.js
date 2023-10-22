var someVariable = 1
var myString = 'hello world!'
let x = 5
if ((x = 6)) {
  someVariable++
}

var expr = Math.random() > 0.5 ? 'hi' : Math.random() > 0.5 ? 'hello' : 'wilkommen'
var expr = Math.random() > 0.5 ? 'hi' : (Math.random() > 0.5 ? 'hello' : 'wilkommen')

const aClosure = () =>
  (a) =>
    b =>
      c =>
        d => a + b + c + d

const hasNationality = (nationality) => (employee) => employee.nationality == nationality

Promise.resolve(5)
  .then(x => x + 1)
  .then(x => x + 2)
  .then(console.log)

class Project {
  constructor(id, name, budget){
  this.id = id;
  this.name = name;
  this.budget = budget;
  }




  toString(){
  return `${this.name} (${this.id}), $${this.budget}`
  }
}