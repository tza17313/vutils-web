var qs = require('qs')

var temp={s:"😄"}
var t1=qs.stringify(temp)
console.log(t1)
console.log(qs.parse(t1))