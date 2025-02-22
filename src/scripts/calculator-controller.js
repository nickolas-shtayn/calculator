import { getFirstNumber, getSecondNumber, setOperation, getResult, 
  appendToFirstNumber, appendToSecondNumber,
  getOperation, clear, backspace, calculate} from "./calculator-model";

import { addToHistory } from "./calculator-history";

const OPERATIONS = ['+', '-', 'x', '/', '%'];
const SPECIAL_KEYS = ['C', "backspace", '=', "enter", '.'];

const normalizeOperation = (operation) => {
  return operation === '*' ? 'x' : operation;
};

export const handlePostCalculation = (value) => {

  const normalizedValue = normalizeOperation(value);

  if (value === "shift" || value === "meta") {
    return;
  }

  if (value === '.') {
    if (!String(getResult()).includes('.')) {
      const resultValue = getResult();
      clear();
      appendToFirstNumber(resultValue);
      appendToFirstNumber('.');
    }
    return;
  }

  if (!isNaN(value)) {
    clear();
    appendToFirstNumber(value);
    return;
  }

  const resultValue = getResult();
  clear();
  appendToFirstNumber(resultValue);

  if (OPERATIONS.includes(normalizedValue)) {
    setOperation(normalizedValue);
  } else if (SPECIAL_KEYS.includes(normalizedValue)) {
    handleSpecialKey(normalizedValue);
  }
};

export const handleNormalInput = (value) => {
  if (!isNaN(value)) {
    if (getOperation() === '') {
      appendToFirstNumber(value);
    } else {
      appendToSecondNumber(value);
    }
  } else {
    const normalizedValue = normalizeOperation(value);
    if (OPERATIONS.includes(normalizedValue)) {
      if (getFirstNumber() !== '') {
        setOperation(normalizedValue);
      }
    } else if (SPECIAL_KEYS.includes(normalizedValue)) {
      handleSpecialKey(normalizedValue);
    } else {
      if (value === "shift" || value === "meta") return;
      alert(`Invalid input: ${value}`);
    }
  }
};

const handleSpecialKey = (value) => {
  switch(value) {
  case 'C':
    clear();
    break;
  case "backspace":
    backspace();
    break;
  case "enter":
  case '=':
    if (getFirstNumber() !== '' && getOperation() !== '' && getSecondNumber() !== '') {
      calculate();
      addToHistory({
        firstNumber: getFirstNumber(),
        operation: getOperation(),
        secondNumber: getSecondNumber(),
        result: getResult()
      });
    }
    break;
  case '.':
    handleDecimalInput();
    break;
  }
};

const handleDecimalInput = () => {
  if (getOperation() === '' && 
      getFirstNumber() !== '' && 
      !getFirstNumber().includes(".")) {
    appendToFirstNumber('.');
  } else if (getOperation() !== '' && 
             getSecondNumber() !== '' && 
             !getSecondNumber().includes(".")) {
    appendToSecondNumber('.');
  }
};