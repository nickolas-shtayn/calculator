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

const backspace = () => {
  if (secondNumber !== '') {
    secondNumber = secondNumber.slice(0, -1);
  } else if (operation !== '') {
    operation = '';
  } else if (firstNumber !== '') {
    firstNumber = firstNumber.slice(0, -1);
  }
};

// REMOVE
// Test backspace in different states
firstNumber = '123';
secondNumber = '456';
operation = '+';

console.log("Initial state:", firstNumber, operation, secondNumber);
backspace(); 
console.log("After first backspace:", firstNumber, operation, secondNumber);
backspace();
backspace(); 
console.log("After clearing secondNumber:", firstNumber, operation, secondNumber);
backspace();
console.log("After clearing operation:", firstNumber, operation, secondNumber);
backspace();
console.log("After first number backspace:", firstNumber, operation, secondNumber);