let firstNumber = '';
let secondNumber = '';
let operation = '';
let result = '';


export const getFirstNumber = () => firstNumber;
export const getSecondNumber = () => secondNumber;
export const getOperation = () => operation;
export const getResult = () => result;

export const appendToFirstNumber = (value) => {
  if (value === '.' && firstNumber.includes('.')) return;
  if (value === '.' && firstNumber === '') {
    firstNumber = '0.';
    return;
  }
  firstNumber += value;
};

export const appendToSecondNumber = (value) => {
  if (value === '.' && secondNumber.includes('.')) return;
  if (value === '.' && secondNumber === '') {
    secondNumber = '0.';
    return;
  }
  secondNumber += value;
};

export const setOperation = (value) => {
  operation = value;
};

export const calculate = () => {
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

export const clear = () => {
  firstNumber = '';
  secondNumber = '';
  operation = '';
  result = ''; 
};

export const backspace = () => {
  if (secondNumber !== '') {
    secondNumber = secondNumber.slice(0, -1);
  } else if (operation !== '') {
    operation = '';
  } else if (firstNumber !== '') {
    firstNumber = firstNumber.slice(0, -1);
  }
};
