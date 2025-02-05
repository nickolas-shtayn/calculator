export class CalculatorView {
  constructor () {
    this.display = document.querySelector("#display-text");
    this.prevCalc = document.querySelector("#previous-calculation");
    this.keyToButtonId = {
      '0': '#zero',
      '1': '#one',
      '2': '#two',
      '3': '#three',
      '4': '#four',
      '5': '#five',
      '6': '#six',
      '7': '#seven',
      '8': '#eight',
      '9': '#nine',
      '+': '#addition',
      '-': '#subtraction',
      'x': '#multiplication',
      '/': '#division',
      '%': '#percentage',
      '.': '#decimal',
      '=': '#equals',
      'enter': '#equals',
      'backspace': '#backspace',
      'C': '#clear',
    };

  }

  updateDisplay(state) {
    if (state.result) {
      this.display.value = state.result;
      this.prevCalc.textContent = `${state.firstNumber} ${state.operation} ${state.secondNumber} =`;
    } else {
      this.display.value = `${state.firstNumber} ${state.operation} ${state.secondNumber}`;
      this.prevCalc.textContent = '';
      }
    }

  animateButton(key) {
    const buttonSelector = this.keyToButtonId[key];
    if (buttonSelector) {
      const buttonElem = document.querySelector(buttonSelector);
      if (buttonElem) {
        buttonElem.classList.remove("animate-bg");
        void buttonElem.offsetWidth;
        buttonElem.classList.add("animate-bg");  
      }
    }
  }
}