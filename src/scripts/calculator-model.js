export class CalculatorModel {
  #firstNumber = '';
  #secondNumber = '';
  #operation = '';
  #result = '';


  get firstNumber() {
    return this.#firstNumber;
  }

  appendToFirstNumber(value) {
    if (value === '.' && this.#firstNumber.includes('.')) {
      return;
    }
    if (value === '.' && this.#firstNumber === '') {
      this.#firstNumber = '0.';
      return;
    }
    this.#firstNumber += value;
  }


  get secondNumber() {
    return this.#secondNumber;
  }

  appendToSecondNumber(value) {
    if (value === '.' && this.#secondNumber.includes('.')) {
      return;
    }
    if (value === '.' && this.#secondNumber === '') {
      this.#secondNumber = '0.';
      return;
    }
    this.#secondNumber += value;
  }

  get operation() {
    return this.#operation;
  }

  setOperation(value) {
    this.#operation = value;
  }

  get result() {
    return this.#result;
  }

  calculate() {

    const firstNumber = Number(this.#firstNumber);
    const secondNumber = Number(this.#secondNumber);

    switch (this.#operation) {
    case "+":
      this.#result = firstNumber + secondNumber;
      break;
    case "-":
      this.#result = firstNumber - secondNumber;
      break;
    case 'x':
    case "*":
      this.#result = firstNumber * secondNumber;
      break;
    case "/":
      if (secondNumber === 0) {
        console.error("Cannot divide by zero");
      } else {
        this.#result = firstNumber / secondNumber;
      }
      break;
    case "%":
      if (secondNumber === 0) {
        console.error("Cannot find module of zero");
      } else {
        this.#result = firstNumber % secondNumber;
      }
      break;
    }
  }

  clear() {
    this.#firstNumber = '';
    this.#secondNumber = '';
    this.#operation = '';
    this.#result = '';
  }

  delete() {
    if (this.#secondNumber !== '') {
      this.#secondNumber = this.#secondNumber.slice(0, -1);
    } else if (this.#operation !== '') {
      this.#operation = '';
    } else if (this.#firstNumber !== '') {
      this.#firstNumber = this.#firstNumber.slice(0, -1);
    }
  }
}