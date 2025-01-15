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

export function createHistoryEntry(userChoices, display, historyFeature) {
  const historyEntry = document.createElement("div");
  historyEntry.className = "calculations-result";

  const historyResult = document.createElement("div");
  const historyCalculation = document.createElement("div");

  historyCalculation.className = "calculation";
  historyCalculation.textContent = `${userChoices.firstNumber} ${userChoices.operation} ${userChoices.secondNumber} =`;

  historyResult.className = "result";
  historyResult.textContent = display.value;

  historyEntry.appendChild(historyCalculation);
  historyEntry.appendChild(historyResult);

  historyFeature.appendChild(historyEntry);
}

export function storeHistoryEntry(userChoices, pastCalculation, historyStorage, display) {
  pastCalculation.firstNumber = userChoices.firstNumber;
  pastCalculation.secondNumber = userChoices.secondNumber;
  pastCalculation.operation = userChoices.operation;
  pastCalculation.result = display.value;

  historyStorage.push({...pastCalculation});
  localStorage.setItem("historyStorage", JSON.stringify(historyStorage));
}

export function evaluateExpression(userChoices, display) {
  let x = Number(userChoices.firstNumber);
  let y = Number(userChoices.secondNumber);
  switch(userChoices.operation) {
  case '+':
    display.value = x + y;
    break;
  case '-':
    display.value = x - y;
    break;
  case 'x':
    display.value = x * y;
    break;
  case '/':
    display.value = x / y;
    break;
  case '%':
    display.value = x % y;
    break;
  }
}

export function handleDecimal(userChoices, display, calculationDone, prevCalc) {
  if (calculationDone) {
    userChoices.firstNumber = '0.';
    display.value = userChoices.firstNumber;
    updateDisplay(userChoices, calculationDone, prevCalc);
    return false;
  }

  if (userChoices.operation === '' && userChoices.firstNumber !== '' && !userChoices.firstNumber.includes(".")) {
    userChoices.firstNumber += '.';
  } 

  else if (userChoices.operation !== '' && userChoices.secondNumber !== '' && !userChoices.secondNumber.includes(".")) {
    userChoices.secondNumber += '.';
  }
  return true;
}

export function handleBackspace(userChoices, display, calculationDone, prevCalc) {
  if (calculationDone) {
    userChoices.firstNumber = '';
    display.value = '';
    updateDisplay(userChoices, calculationDone, prevCalc);
    return false;
  }

  if (userChoices.operation === '') {
    userChoices.firstNumber = userChoices.firstNumber.slice(0, -1);
  } else if (userChoices.secondNumber === '') {
    userChoices.operation = userChoices.operation.slice(0, -1);
  } else {
    userChoices.secondNumber = userChoices.secondNumber.slice(0, -1);
  }
    
  return true;
}