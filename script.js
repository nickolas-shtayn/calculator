const display = document.querySelector("#display-text");
const history = document.querySelector("#history-div")

// store everything in strings so that we can handle multi-digit input and decimal points before converting to Number
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

                    const historyResult = document.createElement("div");
                    const historyCalculation = document.createElement("div");

                    historyCalculation.className = "calculation";
                    historyCalculation.textContent = `${userChoices.firstNumber} ${userChoices.operation} ${userChoices.secondNumber} =`
                    
                    historyResult.className = "result";
                    historyResult.textContent = display.value;

                    history.appendChild(historyCalculation);
                    history.appendChild(historyResult);

                    // reset userChoices so that new input starts a fresh calculation
                    userChoices.secondNumber = '';
                    userChoices.operation = '';
                    userChoices.firstNumber = '';
                }
                return;
            }
            case '.':
                if (userChoices.firstNumber != '' && userChoices.firstNumber.includes(".") === false && userChoices.operation == ''){
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

// mirror the same logic as button clicks, but for keyboard input
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
                const historyResult = document.createElement("div");
                const historyCalculation = document.createElement("div");

                historyCalculation.className = "calculation";
                historyCalculation.textContent = `${userChoices.firstNumber} ${userChoices.operation} ${userChoices.secondNumber} =`
                
                historyResult.className = "result";
                historyResult.textContent = display.value;

                history.appendChild(historyCalculation);
                history.appendChild(historyResult);

                // reset userChoices so that new input starts a fresh calculation
                userChoices.secondNumber = '';
                userChoices.operation = '';
                userChoices.firstNumber = '';
                break;
            }
            break;
            case '.':
                // conditional to check against multiple decimals
                if (userChoices.firstNumber != '' && userChoices.firstNumber.includes(".") === false && userChoices.operation == ''){
                    userChoices.firstNumber += '.';
                } else if (userChoices.secondNumber != '' && userChoices.secondNumber.includes(".") === false){
                    userChoices.secondNumber += '.';
                }
                break;
                default:
                    // alert user if they pressed a non-supported key (besides function keys)
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
            
