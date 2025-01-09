export const display = document.querySelector("#display-text");

export let userChoices = {
    firstNumber: '',
    operation: '',
    secondNumber: '',
}

export function handleCalculatorInput(target) {

    if (target === '.') {
        if (isFirstNumber() && (!userChoices.firstNumber.includes('.') && userChoices.firstNumber !== '')) {
            userChoices.firstNumber += target;
        } else if (!isFirstNumber() && (!userChoices.secondNumber.includes('.') && userChoices.secondNumber !== '')) {
            userChoices.secondNumber += target;
        }
        return;
    }

    if (isNumeric(target)) {
        if (isFirstNumber()) {
            userChoices.firstNumber += target;
        } else {
            userChoices.secondNumber += target;
        }
    } else {
        switch (target) {
            case '+':
            case '-':
            case '/':
            case '%':
                if (userChoices.firstNumber !== '') {
                    userChoices.operation = target;
                }
                break;
            case 'x':
            case '*':
                if (userChoices.firstNumber !== '') {
                    userChoices.operation = 'x';
                }
                break; 
        }
    }
}

export function calculateResult() {
    let result;
    let x = Number(userChoices.firstNumber);
    let y = Number(userChoices.secondNumber);
    switch(userChoices.operation) {
        case '+': 
            result = x + y;
            break;
        case '-': 
            result = x - y;
            break;
        case 'x':
            result = x * y;
            break;
        case '/': 
            result = x / y;
            break;
        case '%': 
            result = x % y;
            break;
    }
    userChoices.secondNumber = '';
    userChoices.operation = '';
    userChoices.firstNumber = String(result);
};

export function updateDisplay() {
    display.value = `${userChoices.firstNumber}${userChoices.operation}${userChoices.secondNumber}`;
};

export function clearDisplay(target) {
    switch(target) {
        case 'C':
        case 'delete':
            userChoices.firstNumber = '';
            userChoices.secondNumber = '';
            userChoices.operation = '';
            return;
        case 'backspace':
            if (isFirstNumber()){
                userChoices.firstNumber = userChoices.firstNumber.slice(0,-1);
            } else if (userChoices.secondNumber === ''){
                userChoices.operation = userChoices.operation.slice(0,-1);
            } else {
                userChoices.secondNumber = userChoices.secondNumber.slice(0,-1);
            }
            return;
        default:
            return;
    }
};

export const isNumeric =(value)=> (!isNaN(value) && value !== " ") ? true : false;
export const isFirstNumber = () => (userChoices.operation === '') ? true : false;

// module.exports = {
//     handleCalculatorInput,
//     calculateResult,
//     updateDisplay,
//     clearDisplay,
//     isNumeric,
//     isFirstNumber
// };