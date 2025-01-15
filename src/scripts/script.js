import { updateDisplay, showResult , createHistoryEntry, storeHistoryEntry, evaluateExpression, handleDecimal, handleBackspace} from "./helpers.js";

const display = document.querySelector("#display-text");
const historyFeature = document.querySelector("#history-div");
const toggle = document.querySelector("#toggle");
const historyClear = document.querySelector("#history-top button");
const prevCalc = document.querySelector("#previous-calculation");

let calculationDone = false;

let userChoices = {
  firstNumber: '',
  operation: '',
  secondNumber: '',
};

const keyToButtonId = {
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
  '*': '#multiplication',
  '/': '#division',
  '%': '#percentage',
  '.': '#decimel',
  '=': '#equals',
  'Enter': '#equals',
  'Backspace': '#backspace' 
};


// store everything in strings so that we can handle multi-digit input and decimal points before converting to Number


let pastCalculation = {
  firstNumber: '',
  operation: '',
  secondNumber: '',
  result: '',
};

let historyStorage = [];

document.addEventListener("DOMContentLoaded", () => {

  let savedHistory = localStorage.getItem("historyStorage");

  if (savedHistory){
    historyStorage = JSON.parse(localStorage.getItem("historyStorage"));
    for (let i = 0; i < historyStorage.length; i++) {

      let calculation = historyStorage[i];

      const historyEntry = document.createElement("div");
      historyEntry.className = "calculations-result";

      const historyResult = document.createElement("div");
      const historyCalculation = document.createElement("div");

      historyCalculation.className = "calculation";
      historyCalculation.textContent = `${calculation.firstNumber} ${calculation.operation} ${calculation.secondNumber} =`;
        
      historyResult.className = "result";
      historyResult.textContent = calculation.result;

      historyEntry.appendChild(historyCalculation);
      historyEntry.appendChild(historyResult);

      historyFeature.appendChild(historyEntry);
    }
  }
});

const numPad = document.querySelector(".buttons");
numPad.addEventListener("click", (e) => {
  const clickedButton = e.target.closest("button");

  clickedButton.classList.remove("animate-bg");
  void clickedButton.offsetWidth;
  clickedButton.classList.add("animate-bg");
 
  let target = clickedButton.textContent.trim();
    
  if (!isNaN(target) && target !== ' ') {
    if (calculationDone) {
      userChoices.firstNumber = target;
      display.value = userChoices.firstNumber;
      updateDisplay(userChoices, calculationDone, prevCalc);
      return;
    }
    if (userChoices.operation === '') {
      userChoices.firstNumber += target;
    } else {
      userChoices.secondNumber += target;
    }
  } else {
    switch (target) {
    case '+':
    case '-':
    case 'x':
    case '/':
    case '%':
      if (calculationDone) {
        prevCalc.textContent = '';
        calculationDone = false;
      }
      if (userChoices.firstNumber !== '') {
        userChoices.operation = target;
      }
      break;
    case '=': {
      if (userChoices.firstNumber !== '' && userChoices.operation !== '' && userChoices.secondNumber !== '') {
        evaluateExpression(userChoices, display);

        prevCalc.textContent = `${userChoices.firstNumber} ${userChoices.operation} ${userChoices.secondNumber}`;

        createHistoryEntry(userChoices, display, historyFeature);
        storeHistoryEntry(userChoices, pastCalculation, historyStorage, display);

        // reset userChoices so that new input starts a fresh calculation
        userChoices.secondNumber = '';
        userChoices.operation = '';
        showResult(userChoices, calculationDone, display);
        userChoices.firstNumber = display.value;
        calculationDone = true;
      }
      return;
    }
    case '.':
      handleDecimal(userChoices, display, calculationDone, prevCalc);
      break;
    case 'C':
      userChoices.firstNumber = '';
      display.value = '';
      updateDisplay(userChoices, calculationDone, prevCalc);
      return; 
    case 'backspace':
      handleBackspace(userChoices, display, calculationDone, prevCalc);
      break;
    }
  }
  display.value = `${userChoices.firstNumber} ${userChoices.operation} ${userChoices.secondNumber}`;
});

const calculator = document.querySelector("#calculator");

// mirror the same logic as button clicks, but for keyboard input
calculator.addEventListener("keydown", (e) => {
  let target = e.key;

  const buttonSelector = keyToButtonId[target];
  if (buttonSelector) {
    const buttonElem = document.querySelector(buttonSelector);
    if (buttonElem) {
      buttonElem.classList.remove("animate-bg");
      void buttonElem.offsetWidth;
      buttonElem.classList.add("animate-bg");
    }
  }

  switch (target) {
  case 'Backspace':
    handleBackspace(userChoices, display, calculationDone, prevCalc);
    break;
  case 'Delete':
    userChoices.firstNumber = '';
    display.value = '';
    updateDisplay(userChoices, calculationDone, prevCalc);
    break;
  case '/':
    if (calculationDone) {
      prevCalc.textContent = '';
      calculationDone = false;
    }
    if (userChoices.firstNumber !== '') {
      userChoices.operation = '/';
    }
    break;
  case '*':
    if (calculationDone) {
      prevCalc.textContent = '';
      calculationDone = false;
    }
    if (userChoices.firstNumber !== '') {
      userChoices.operation = 'x';
    }
    break;
  case '-':
    if (calculationDone) {
      prevCalc.textContent = '';
      calculationDone = false;
    }
    if (userChoices.firstNumber !== '') {
      userChoices.operation = '-';
    }
    break;
  case '+':
    if (userChoices.firstNumber !== '') {
      userChoices.operation = '+';
    }
    break;
  case '%':
    if (calculationDone) {
      prevCalc.textContent = '';
      calculationDone = false;
    }
    if (userChoices.firstNumber !== '') {
      userChoices.operation = '+';
    }
    break;
  case 'Enter':
  case '=':
    if (userChoices.firstNumber !== '' && userChoices.operation !== '' && userChoices.secondNumber !== '') {
      evaluateExpression(userChoices, display);
      prevCalc.textContent = `${userChoices.firstNumber} ${userChoices.operation} ${userChoices.secondNumber}`;

      createHistoryEntry(userChoices, display, historyFeature);
      storeHistoryEntry(userChoices, pastCalculation, historyStorage, display);

      // reset userChoices so that new input starts a fresh calculation
      userChoices.secondNumber = '';
      userChoices.operation = '';
      showResult(userChoices, calculationDone, display);
      break;
    }
    break;
  case '.':
    // conditional to check against multiple decimals
    handleDecimal(userChoices, display, calculationDone, prevCalc);
    break;
  default:
    // alert user if they pressed a non-supported key (besides function keys)
    if (isNaN(target)) {
      if (target === "Shift" || target === "Meta") {
        // do nothing
      } else {
        alert(`${target} is an invalid input`);
      }
    } else {
      if (calculationDone) {
        userChoices.firstNumber = target;
        display.value = userChoices.firstNumber;
        updateDisplay(userChoices, calculationDone, prevCalc);

      } else {
        if (userChoices.operation === '') {
          userChoices.firstNumber += target;
        } else {
          userChoices.secondNumber += target;
        }
      }
    }
    break;
  }
  display.value = `${userChoices.firstNumber} ${userChoices.operation} ${userChoices.secondNumber}`;
});
            
const historyDiv = document.querySelector("#history-div");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("open");
  toggle.classList.toggle("collapsed");
  historyDiv.classList.toggle("open");
  historyDiv.classList.toggle("collapsed");
});

historyClear.addEventListener("click", () => {
  localStorage.clear();
  const historyEntries = document.querySelectorAll(".calculations-result");
  historyEntries.forEach(historyEntry => historyEntry.remove());
});

historyFeature.addEventListener("click", (event) => {
  const targetEntry = event.target.closest(".calculations-result");
  if (targetEntry) {
    const calculation = targetEntry.querySelector(".calculation").textContent;
    const parts = calculation.split(" ");
    userChoices.firstNumber = parts[0];
    userChoices.operation = parts[1];
    userChoices.secondNumber = parts[2];
    display.value = `${userChoices.firstNumber} ${userChoices.operation} ${userChoices.secondNumber}`;
  }
});