let firstNumber = '';
let secondNumber = '';
let operation = '';
let result = '';


const getFirstNumber = () => firstNumber;
const getSecondNumber = () => secondNumber;
const getOperation = () => operation;
const getResult = () => result;

console.log("first:", getFirstNumber(), "second:", getSecondNumber(), "operation:", getOperation(), "result:", getResult());

const appendToFirstNumber = (value) => {
  if (value === '.' && firstNumber.includes('.')) return;
  if (value === '.' && firstNumber === '') {
    firstNumber = '0.';
    return;
  }
  firstNumber += value;
};

// REMOVE
console.log("Before appending:", getFirstNumber());
appendToFirstNumber(2);
console.log("After appending:", getFirstNumber());

const appendToSecondNumber = (value) => {
  if (value === '.' && secondNumber.includes('.')) return;
  if (value === '.' && secondNumber === '') {
    secondNumber = '0.';
    return;
  }
  secondNumber += value;
};

// REMOVE
console.log("Before appending:", getSecondNumber());
appendToSecondNumber(3);
console.log("After appending:", getSecondNumber());


const setOperation = (value) => {
  operation = value;
};

// REMOVE
console.log("Before setting:", getOperation());
setOperation("+");
console.log("After setting:", getOperation());

const calculate = () => {
  const num1 = Number(firstNumber);
  const num2 = Number(secondNumber);

  switch (operation) {
  case "+": result = num1 + num2; break;
  case "-": result = num1 - num2; break;
  case 'x':
  case "*": result = num1 * num2; break;
  case "/":
    if (num2 === 0) {
      console.error("Cannot divide by zero");
      return;
    }
    result = num1 / num2;
    break;
  case "%":
    if (num2 === 0) {
      console.error("Cannot find module of zero");
      return;
    }
    result = num1 % num2;
    break;
  }
};

// REMOVE
firstNumber = '10';
secondNumber = '5';
console.log("Testing calculate() with 10 and 5:");
['+', '-', '*', '/'].forEach(op => {
  operation = op;
  calculate();
  console.log(op + ":", getResult());
});

// calculate() {

//   const firstNumber = Number(this.#firstNumber);
//   const secondNumber = Number(this.#secondNumber);

//   switch (this.#operation) {
//   case "+":
//     this.#result = firstNumber + secondNumber;
//     break;
//   case "-":
//     this.#result = firstNumber - secondNumber;
//     break;
//   case 'x':
//   case "*":
//     this.#result = firstNumber * secondNumber;
//     break;
//   case "/":
//     if (secondNumber === 0) {
//       console.error("Cannot divide by zero");
//     } else {
//       this.#result = firstNumber / secondNumber;
//     }
//     break;
//   case "%":
//     if (secondNumber === 0) {
//       console.error("Cannot find module of zero");
//     } else {
//       this.#result = firstNumber % secondNumber;
//     }
//     break;
//   }
// }

// clear() {
//   this.#firstNumber = '';
//   this.#secondNumber = '';
//   this.#operation = '';
//   this.#result = '';
// }

// delete() {
//   if (this.#secondNumber !== '') {
//     this.#secondNumber = this.#secondNumber.slice(0, -1);
//   } else if (this.#operation !== '') {
//     this.#operation = '';
//   } else if (this.#firstNumber !== '') {
//     this.#firstNumber = this.#firstNumber.slice(0, -1);
//   }
// }