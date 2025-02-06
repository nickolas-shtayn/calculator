const display = document.querySelector("#display-text");
const prevCalc = document.querySelector("#previous-calculation");

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
  'x': '#multiplication',
  '/': '#division',
  '%': '#percentage',
  '.': '#decimal',
  '=': '#equals',
  'enter': '#equals',
  'backspace': '#backspace',
  'C': '#clear',
};

let mockDisplay = { value: '' };
let mockPrevCalc = { textContent: '' };

const updateDisplay = (firstNumber, secondNumber, operation, result) => {
  if (result) {
    mockDisplay.value = result;
    mockPrevCalc.textContent = `${firstNumber} ${operation} ${secondNumber} =`;
  } else {
    mockDisplay.textContent = `${firstNumber} ${operation} ${secondNumber} =`;
    mockPrevCalc.textContent = '';
  }
};

// REMOVE
console.log("Display value before:", mockDisplay.value);
console.log("Previous calculation before:", mockPrevCalc.textContent);
updateDisplay('1', '2', '+', '3');
console.log("Display value after:", mockDisplay.value);
console.log("Previous calculation after:", mockPrevCalc.textContent);


const animateButton = (key) => {
  const buttonSelector = keyToButtonId[key];
  if (buttonSelector) {
    const buttonElem = document.querySelector(buttonSelector);
    if (buttonElem) {
      buttonElem.classList.remove("animate-bg");
      void buttonElem.offsetWidth;
      buttonElem.classList.add("animate-bg");  
    }
  }
};