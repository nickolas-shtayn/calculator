const OPERATIONS = ['+', '-', 'x', '*', '/', '%'];
const SPECIAL_KEYS = ['C', "backspace", '=', "enter", '.'];


const handlePostCalculation = (value) => {
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
    deleteLastEntry();
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

// export class CalculatorController {
//   constructor (model, view, history) {
//     this.model = model;
//     this.view = view;
//     this.history = history

//     this.history.onHistorySelect = (calculation) => {
//       this.model.appendToFirstNumber(calculation.firstNumber);
//       this.model.setOperation(calculation.operation);
//       this.model.appendToSecondNumber(calculation.secondNumber);
//       this.updateView();
//     };
//   }

//   processInput(value) {
//     if (this.model.result) {
//       this.handlePostCalculation(value) 
//     } else {
//       this.handleNormalInput(value)
//     }
//     this.updateView();
//   }

//   // operation
//   else if (this.#OPERATIONS.includes(value)) {
//     if (this.model.firstNumber !== '') {
//       this.model.setOperation(value);
//     }
//   }
//   // special
//   else if (this.#SPECIAL_KEYS.includes(value)) {
//     switch(value) {
//       case 'C':
//           this.model.clear();
//           break;
//       case "backspace":
//           this.model.delete();
//           break;
//       case "enter":
//       case '=':
//         if (this.model.firstNumber !== '' && this.model.operation !== '' && this.model.secondNumber !== '') {
//           this.model.calculate();
//           this.history.addToHistory({
//             firstNumber: this.model.firstNumber,
//             operation: this.model.operation,
//             secondNumber: this.model.secondNumber,
//             result: this.model.result
//           });
//         }
//           break;
//       case '.':
//           if (this.model.operation === '' && this.model.firstNumber !== '' && !this.model.firstNumber.includes(".")) {
//             this.model.appendToFirstNumber('.');
//           } else if (this.model.operation !== '' && this.model.secondNumber !== '' && !this.model.secondNumber.includes(".")) {
//             this.model.appendToSecondNumber('.');
//           }
//           break;
//     }
//   }
//   else {
//     if (value === "shift" || value === "meta") {
//       return;
//     }
//     alert(`Invalid input: ${value}`);
//     return;
//     }
//   }

//   updateView() {
//     const currentState = {
//       firstNumber: this.model.firstNumber,
//       secondNumber: this.model.secondNumber,
//       operation: this.model.operation,
//       result: this.model.result
//     };
//     this.view.updateDisplay(currentState);
//   }
  
// };