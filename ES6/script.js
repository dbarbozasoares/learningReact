// 1 - var, let and const
var x = 10;
var y = 15;

if (y > 10) {
  var x = 5;
  console.log(x);
}

console.log(x);

let a = 3;
let b = 6;

if (a < b) {
  let a = 7;
  console.log(a);
}

console.log(a);

const func = (s) => {
  console.log("inside arrow " + s);
};

func(a);

const arr = [1, 2, 3, 4, 5, 6];
const higherNumbers = arr.filter((num) => {
  return num >= 3;
});

console.log(higherNumbers);
