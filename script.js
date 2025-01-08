const validOperators = ['+', '-', 'x', '*', '/', '%', '=', 'enter', 'backspace', 'delete', '.', 'shift', 'meta'];
const display = document.querySelector("#display-text");
const numPad = document.querySelector("#numpad")
const calculator = document.querySelector("#calculator");

let userChoices = {
    firstNumber: '',
    operation: '',
    secondNumber: '',
}

numPad.addEventListener("click", (e) => {
    let target = e.target.textContent;

    clearDisplay(target)

    if (target === '=') {
        if (userChoices.firstNumber !== '' && userChoices.operation !== '' && userChoices.secondNumber !== '') {
            calculateResult()
        } else {
            alert("Empty input");
        }
    } else {
        handleCalculatorInput(target)
    }

    updateDisplay();

});

calculator.addEventListener("keydown", (e) => {
    let target = e.key.toLowerCase(); 

    clearDisplay(target)

    if (isNaN(target)) {
        if (!validOperators.includes(target)) {
            alert(`${target} is an invalid key`);
        };
    }
        

    if (target === '=' || target === 'enter') {
        if (userChoices.firstNumber !== '' && userChoices.operation !== '' && userChoices.secondNumber !== '') {
            calculateResult()
        } else {
            alert("Empty input");
        }
    } else {
        handleCalculatorInput(target)
    }

    updateDisplay();

});

function handleCalculatorInput(target) {

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

function calculateResult() {
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

function updateDisplay() {
    display.value = `${userChoices.firstNumber}${userChoices.operation}${userChoices.secondNumber}`;
};

function clearDisplay(target) {
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

const isNumeric =(value)=> (!isNaN(value) && value !== " ") ? true : false;
const isFirstNumber = () => (userChoices.operation === '') ? true : false;