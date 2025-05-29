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
  console.log(`inside arrow ${s}`);
};

func(a);

const arr = [1, 2, 3, 4, 5, 6];
const higherNumbers = arr.filter((num) => {
  return num >= 3;
});

console.log(higherNumbers);

const products = [
  { id: 1, name: "Iron", active: true },
  { id: 2, name: "Board", active: false },
];

const activeItems = products.filter((product) => product.active);
const notActiveItems = products.filter((product) => !product.active);

console.log(`Active items: ${activeItems.length}`);
console.log(`Not Active items: ${notActiveItems.length}`);

// template literals
const username = "Diego";
const age = 26;
console.log(`Username: ${username} is ${age} old`);

// destructuring
const fruits = ["Apple", "Orange", "Papaya"];

const [f1, f2, f3] = fruits;

console.log(f1);
console.log(f3);

const productDetails = {
  name: "Mouse",
  price: 29.99,
  category: "Accessories",
  color: "Gray",
};

const { name: productName, price, category: productCat } = productDetails;

console.log(
  `The name is ${productName} and it costs ${price} from category ${productCat}`
);

// Spread operator with array and objects
const spreadArr = [1, 2, 3];
const spreadArrTwo = [4, 5, 6];
const spreadArrThree = [...spreadArr, ...spreadArrTwo];

console.log(spreadArrThree);

const spreadArrFour = [0, ...spreadArr, 4];
console.log(spreadArrFour);

const carName = { name: "Jetta" };
const carBrand = { brand: "Volks" };
const otherInfos = { km: 90000, price: 10000 };

const carInfo = { ...carName, ...carBrand, ...otherInfos };
console.log(carInfo);

// Classes
class Product {
  constructor(name, price) {
    this.name = `Product name: ${name}`;
    this.price = price;
  }

  productWithDiscount(discount) {
    return this.price * ((100 - discount) / 100);
  }
}

const shirt = new Product("T-SHIRT", 20);
console.log(shirt);

console.log(shirt.productWithDiscount(25));

const shoes = new Product("Green Shoes", 120);

console.log(
  `${shoes.name} with discount from $${
    shoes.price
  } to $${shoes.productWithDiscount(50)}`
);

// Inheritance
class ProductWithAttributes extends Product {
  constructor(name, price, colors) {
    super(name, price);
    this.colors = colors;
  }

  displayColors() {
    console.log("We have these colors:");
    this.colors.forEach((color) => {
      console.log(color);
    });
  }
}

const hat = new ProductWithAttributes("Hat", 29.99, [
  "Black",
  "Blue",
  "Green",
  "White",
]);

console.log(`${hat.name} have these colors available:`);
hat.displayColors();
let whatever = 0;
