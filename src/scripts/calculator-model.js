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

const clear = () => {
  firstNumber = '';
  secondNumber = '';
  operation = '';
  result = ''; 
};

//REMOVE
console.log("before clearing:", firstNumber, secondNumber, operation, result);
clear();
console.log("after clearing:", firstNumber, secondNumber, operation, result);



// delete() {
//   if (this.#secondNumber !== '') {
//     this.#secondNumber = this.#secondNumber.slice(0, -1);
//   } else if (this.#operation !== '') {
//     this.#operation = '';
//   } else if (this.#firstNumber !== '') {
//     this.#firstNumber = this.#firstNumber.slice(0, -1);
//   }
// }