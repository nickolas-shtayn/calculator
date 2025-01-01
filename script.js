const display = document.querySelector("#display-text");
const prevCalc = document.querySelector("#previous-calculation");

let userChoices = {
    firstNumber: '',
    operation: '',
    secondNumber: '',
};

let calculationDone = false;

const numPad = document.querySelector(".buttons");
numPad.addEventListener("click", (e) => {
    let target = e.target.textContent;
    
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
calculator.addEventListener("keydown", (e) => {
    let target = e.key;
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
            if (calculationDone) {
                prevCalc.textContent = '';
                calculationDone = false;
            }
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
                userChoices.operation = '%';
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
                userChoices.secondNumber = '';
                userChoices.operation = '';
                userChoices.firstNumber = display.value;
                calculationDone = true;
            }
            break;
        case '.':
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
            if (isNaN(target)) {
                if (target === "Shift" || target === "Meta") {
                    ;
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