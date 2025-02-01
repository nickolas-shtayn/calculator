const display = document.querySelector("#display-text");
const historyFeature = document.querySelector("#history-div");
const toggle = document.querySelector("#toggle");
const historyClear = document.querySelector("#history-top button");
const prevCalc = document.querySelector("#previous-calculation");

let calculationDone = false;

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
let userChoices = {
  firstNumber: '',
  operation: '',
  secondNumber: '',
};

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
 
  let target = clickedButton.textContent;
    
  if (!isNaN(target) && target !== ' ') {
    if (calculationDone) {
      prevCalc.textContent = '';
      userChoices.firstNumber = target;
      userChoices.operation = '';
      userChoices.secondNumber = '';
      display.value = userChoices.firstNumber;
      calculationDone = false;
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

        prevCalc.textContent = `${x} ${userChoices.operation} ${y}`;

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

        pastCalculation.firstNumber = userChoices.firstNumber;
        pastCalculation.secondNumber = userChoices.secondNumber;
        pastCalculation.operation = userChoices.operation;
        pastCalculation.result = display.value;

        historyStorage.push({...pastCalculation});
        localStorage.setItem("historyStorage", JSON.stringify(historyStorage));

        // reset userChoices so that new input starts a fresh calculation
        userChoices.secondNumber = '';
        userChoices.operation = '';
        userChoices.firstNumber = display.value;
        calculationDone = true;
      }
      return;
    }
    case '.':
      if (calculationDone) {
        prevCalc.textContent = '';
        userChoices.firstNumber = '0.';
        userChoices.operation = '';
        userChoices.secondNumber = '';
        display.value = userChoices.firstNumber;
        calculationDone = false;
        return;
      }
      if (userChoices.operation === '' && userChoices.firstNumber !== '' && !userChoices.firstNumber.includes(".")) {
        userChoices.firstNumber += '.';
      } else if (userChoices.operation !== '' && userChoices.secondNumber !== '' && !userChoices.secondNumber.includes(".")) {
        userChoices.secondNumber += '.';
      }
      break;
    case 'C':
      userChoices.firstNumber = '';
      userChoices.secondNumber = '';
      userChoices.operation = '';
      display.value = '';
      prevCalc.textContent = '';
      calculationDone = false;
      return; 
    case 'backspace':
      if (calculationDone) {
        prevCalc.textContent = '';
        userChoices.firstNumber = '';
        userChoices.secondNumber = '';
        userChoices.operation = '';
        display.value = '';
        calculationDone = false;
        return;
      }
      if (userChoices.operation === ''){
        userChoices.firstNumber = userChoices.firstNumber.slice(0, -1);
      } else if (userChoices.secondNumber === ''){
        userChoices.operation = userChoices.operation.slice(0, -1);
      } else {
        userChoices.secondNumber = userChoices.secondNumber.slice(0, -1);
      }
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
    if (calculationDone) {
      prevCalc.textContent = '';
      userChoices.firstNumber = '';
      userChoices.secondNumber = '';
      userChoices.operation = '';
      display.value = '';
      calculationDone = false;
      break;
    }
    if (userChoices.operation === '') {
      userChoices.firstNumber = userChoices.firstNumber.slice(0, -1);
    } else if (userChoices.secondNumber === '') {
      userChoices.operation = userChoices.operation.slice(0, -1);
    } else {
      userChoices.secondNumber = userChoices.secondNumber.slice(0, -1);
    }
    break;
  case 'Delete':
    userChoices.firstNumber = '';
    userChoices.secondNumber = '';
    userChoices.operation = '';
    display.value = '';
    prevCalc.textContent = '';
    calculationDone = false;
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
      prevCalc.textContent = `${x} ${userChoices.operation} ${y}`;

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

      pastCalculation.firstNumber = userChoices.firstNumber;
      pastCalculation.secondNumber = userChoices.secondNumber;
      pastCalculation.operation = userChoices.operation;
      pastCalculation.result = display.value;

      historyStorage.push({...pastCalculation});

      localStorage.setItem("historyStorage", JSON.stringify(historyStorage));

      // reset userChoices so that new input starts a fresh calculation
      userChoices.secondNumber = '';
      userChoices.operation = '';
      userChoices.firstNumber = display.value;
      calculationDone = true;
      break;
    }
    break;
  case '.':
    // conditional to check against multiple decimals
    if (calculationDone) {
      prevCalc.textContent = '';
      userChoices.firstNumber = '0.';
      userChoices.operation = '';
      userChoices.secondNumber = '';
      display.value = userChoices.firstNumber;
      calculationDone = false;
      break;
    }
    if (userChoices.operation === '' && userChoices.firstNumber !== '' && !userChoices.firstNumber.includes(".")) {
      userChoices.firstNumber += '.';
    } else if (userChoices.operation !== '' && userChoices.secondNumber !== '' && !userChoices.secondNumber.includes(".")) {
      userChoices.secondNumber += '.';
    }
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
        prevCalc.textContent = '';
        userChoices.firstNumber = target;
        userChoices.operation = '';
        userChoices.secondNumber = '';
        display.value = userChoices.firstNumber;
        calculationDone = false;
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