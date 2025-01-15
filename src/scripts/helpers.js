export function updateDisplay(userChoices, calculationDone, prevCalc) { 
  userChoices.secondNumber = '';
  userChoices.operation = '';
  calculationDone = false;
  prevCalc.textContent = '';
}

export function showResult(userChoices, calculationDone, display) {
  userChoices.firstNumber = display.value;
  calculationDone = true;
}