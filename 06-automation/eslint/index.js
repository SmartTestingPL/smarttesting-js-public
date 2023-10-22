console.debug(sumOfPrimes(2000))
console.log('no semicolons at this line')
var str = 'single quote dude!'
var b
if(a = 1){
  b = 2
}
if (booleanMethod() == true) { /* ... */ }
try {
  booleanMethod();
} catch (e) {
  throw e; // co mi to daje? 🤔
}

function booleanMethod(){
  return Math.random() > 0.5;
}

function sumOfPrimes(max) {
  var total = 0;
  for (var i = 1; i <= max; ++i) {
    for (var j = 2; j < i; ++j) {
      if (i % j == 0) {
        break;
      }
    }
    total += i;
  }
  return total;
 } 
