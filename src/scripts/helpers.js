export function updateDisplay(display, prevCalc, userChoices) { 
  userChoices.secondNumber = '';
  userChoices.operation = '';
  calculationDone = false;
  prevCalc.textContent = '';
}

export function showResult(display, userChoices) {
  userChoices.firstNumber = display.value;
  calculationDone = true;
}