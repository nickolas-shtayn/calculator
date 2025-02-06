const OPERATIONS = ['+', '-', 'x', '*', '/', '%'];
const SPECIAL_KEYS = ['C', "backspace", '=', "enter", '.'];


export const handlePostCalculation = (value) => {
  const previousResult = getResult();
  clear();

  if (!isNaN(value)) {
    appendToFirstNumber(value);
  } else if (OPERATIONS.includes(value)) {
    appendToFirstNumber(previousResult);
    setOperation(value);
  }
};

const handleNormalInput = (value) => {
  if (!isNaN(value)) {
    if (getOperation() === '') {
      appendToFirstNumber(value);
    } else {
      appendToSecondNumber(value);
    }
  } else if (OPERATIONS.includes(value)) {
    if (getFirstNumber() !== '') {
      setOperation(value);
    }
  } else if (SPECIAL_KEYS.includes(value)) {
    handleSpecialKey(value);
  } else {
    if (value === "shift" || value === "meta") return;
    alert(`Invalid input: ${value}`);
  }
};

const handleSpecialKey = (value) => {
  switch(value) {
  case 'C':
    clearCalculator();
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