const display = document.querySelector("#display-text");

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

let userChoices = {
    firstNumber: '',
    operation: '',
    secondNumber: '',
}

const numPad = document.querySelector(".buttons")
numPad.addEventListener("click", (e) => {

    const clickedButton = e.target.closest("button");

    clickedButton.classList.remove("animate-bg");
    void clickedButton.offsetWidth;
    clickedButton.classList.add("animate-bg");
  
    let target = clickedButton.textContent;


    if (!isNaN(target) && target !== ' ') {
        if (userChoices.operation === '') {
            userChoices.firstNumber += target;
        } else if (userChoices.operation !== ''){
            userChoices.secondNumber += target;
        }
    } else {
        switch (target) {
            case '+':
            case '-':
            case 'x':
            case '/':
            case '%':
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
                    userChoices.secondNumber = '';
                    userChoices.operation = '';
                    userChoices.firstNumber = display.value;
                }
                return;
            }
            case '.':
                if (userChoices.firstNumber != '' && userChoices.firstNumber.includes(".") === false){
                    userChoices.firstNumber += '.';
                } else if (userChoices.secondNumber != '' && userChoices.secondNumber.includes(".") === false){
                    userChoices.secondNumber += '.';
                }
                break;
            case 'C':
                userChoices.firstNumber = '';
                userChoices.secondNumber = '';
                userChoices.operation = '';
                display.value = '';
                return; 
            case 'backspace':
                if (userChoices.operation === ''){
                    userChoices.firstNumber = userChoices.firstNumber.slice(0,-1);
                } else if (userChoices.secondNumber === ''){
                    userChoices.operation = userChoices.operation.slice(0,-1);
                } else {
                    userChoices.secondNumber = userChoices.secondNumber.slice(0,-1);
                }
                break;
        }
    }
    display.value = `${userChoices.firstNumber} ${userChoices.operation} ${userChoices.secondNumber}`;
});

const calculator = document.querySelector("#calculator");

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
            if (userChoices.operation === ''){
                userChoices.firstNumber = userChoices.firstNumber.slice(0,-1);
            } else if (userChoices.secondNumber === ''){
                userChoices.operation = userChoices.operation.slice(0,-1);
            } else {
                userChoices.secondNumber = userChoices.secondNumber.slice(0,-1)
            }
            break;
        case 'Delete':
            userChoices.firstNumber = '';
            userChoices.secondNumber = '';
            userChoices.operation = '';
            display.value = ''; 
            break
        case '/':
            if (userChoices.firstNumber !== '') {
                userChoices.operation = '/';
            }
            break; 
        case '*':
            if (userChoices.firstNumber !== '') {
                userChoices.operation = 'x';
            }
            break;
        case '-':
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
            if (userChoices.firstNumber !== '') {
                userChoices.operation = '%';
            }
            break;
        case 'Enter':
        case '=':
            if (userChoices.firstNumber !== '' && userChoices.operation !== '' && userChoices.secondNumber !== '') {
                switch(userChoices.operation) {
                    case '+':
                        display.value = Number(userChoices.firstNumber) + Number(userChoices.secondNumber);
                        break;
                    case '-':
                        display.value = Number(userChoices.firstNumber) - Number(userChoices.secondNumber);
                        break;
                    case 'x':
                        display.value = Number(userChoices.firstNumber) * Number(userChoices.secondNumber);
                        break;
                    case '/':
                        display.value = Number(userChoices.firstNumber) / Number(userChoices.secondNumber);
                        break;
                    case '%':
                        display.value = Number(userChoices.firstNumber) % Number(userChoices.secondNumber);
                        break;
                } 
                userChoices.secondNumber = '';
                userChoices.operation = '';
                userChoices.firstNumber = display.value;
                break;
            }
            break;
        case '.':
            if (userChoices.firstNumber != '' && userChoices.firstNumber.includes(".") === false){
                userChoices.firstNumber += '.';
            } else if (userChoices.secondNumber != '' && userChoices.secondNumber.includes(".") === false){
                userChoices.secondNumber += '.';
            }
            break;
        default:
            if (isNaN(target)) {
                if (target === "Shift" || target === "Meta") {
                    ;
                } else {
                    alert(`${target} is an invalid input`);   
                }
            } else if (userChoices.operation == ''){
                userChoices.firstNumber += target
            } else {
                userChoices.secondNumber += target
            }
            break;
    }
    display.value = `${userChoices.firstNumber} ${userChoices.operation} ${userChoices.secondNumber}`;
});
