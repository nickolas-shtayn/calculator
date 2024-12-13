let userChoices = {
    firstNumber: '',
    operation: '',
    secondNumber: '',
}

const numPad = document.querySelector(".buttons")
numPad.addEventListener("click", (e) => {
    let target = e.target.textContent;
    
    if (!isNaN(target) && target !== ' ') {
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
                userChoices.operation = target;
                break;
            case '=': {
                let x = Number(userChoices.firstNumber);
                let y = Number(userChoices.secondNumber);
                switch(userChoices.operation) {
                    case '+':
                        display.textContent = x + y;
                        break;
                    case '-':
                        display.textContent = x - y;
                        break;
                    case 'x':
                        display.textContent = x * y;
                        break;
                    case '/':
                        display.textContent = x / y;
                        break;
                }
            }
                userChoices.secondNumber = '';
                userChoices.operation = '';
                userChoices.firstNumber = display.textContent;
                return; 
            case 'C':
                userChoices.firstNumber = '';
                userChoices.secondNumber = '';
                userChoices.operation = '';
                display.textContent = '';
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
    display.textContent = `${userChoices.firstNumber} ${userChoices.operation} ${userChoices.secondNumber}`;
});

const calculator = document.querySelector("body");

calculator.addEventListener("keydown", (e) => {
    let target = e.key;
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
        default:
            if (isNaN(target)) {
                return
            } else if (userChoices.operation == ''){
                userChoices.firstNumber += target
            } else {
                userChoices.secondNumber += target
            }
            break;
    }
    display.textContent = `${userChoices.firstNumber} ${userChoices.operation} ${userChoices.secondNumber}`;
})


const display = document.querySelector("#display-text");
