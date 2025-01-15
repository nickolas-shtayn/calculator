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