const display = document.querySelector("#display-text");
const history = document.querySelector("#history-div")

let userChoices = {
    firstNumber: '',
    operation: '',
    secondNumber: '',
}

let pastCalculation = {
    firstNumber: '',
    operation: '',
    secondNumber: '',
    result: '',
}

let historyStorage = [];

document.addEventListener("DOMContentLoaded", () => {

    let savedHistory = localStorage.getItem("historyStorage");

    if (savedHistory){
        historyStorage = JSON.parse(localStorage.getItem("historyStorage"));
        for (i = 0; i < historyStorage.length; i++) {

            let calculation = historyStorage[i];

            const historyEntry = document.createElement("div");
            historyEntry.className = "calculations-result";

            const historyResult = document.createElement("div");
            const historyCalculation = document.createElement("div");

            historyCalculation.className = "calculation";
            historyCalculation.textContent = `${calculation.firstNumber} ${calculation.operation} ${calculation.secondNumber} =`
            
            historyResult.className = "result";
            historyResult.textContent = calculation.result;

            historyEntry.appendChild(historyCalculation);
            historyEntry.appendChild(historyResult);

            history.appendChild(historyEntry)
        }
    }
})

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
                    const historyEntry = document.createElement("div");
                    historyEntry.className = "calculations-result";

                    const historyResult = document.createElement("div");
                    const historyCalculation = document.createElement("div");

                    historyCalculation.className = "calculation";
                    historyCalculation.textContent = `${userChoices.firstNumber} ${userChoices.operation} ${userChoices.secondNumber} =`
                    
                    historyResult.className = "result";
                    historyResult.textContent = display.value;

                    historyEntry.appendChild(historyCalculation);
                    historyEntry.appendChild(historyResult);
    
                    history.appendChild(historyEntry)

                    pastCalculation.firstNumber = userChoices.firstNumber;
                    pastCalculation.secondNumber = userChoices.secondNumber;
                    pastCalculation.operation = userChoices.operation;
                    pastCalculation.result = display.value;

                    historyStorage.push({...pastCalculation});

                    localStorage.setItem("historyStorage", JSON.stringify(historyStorage));

                    userChoices.secondNumber = '';
                    userChoices.operation = '';
                    userChoices.firstNumber = display.value;
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
                const historyEntry = document.createElement("div");
                historyEntry.className = "calculations-result";

                const historyResult = document.createElement("div");
                const historyCalculation = document.createElement("div");

                historyCalculation.className = "calculation";
                historyCalculation.textContent = `${userChoices.firstNumber} ${userChoices.operation} ${userChoices.secondNumber} =`
                
                historyResult.className = "result";
                historyResult.textContent = display.value;
                
                historyEntry.appendChild(historyCalculation);
                historyEntry.appendChild(historyResult);

                history.appendChild(historyEntry)

                pastCalculation.firstNumber = userChoices.firstNumber;
                pastCalculation.secondNumber = userChoices.secondNumber;
                pastCalculation.operation = userChoices.operation;
                pastCalculation.result = display.value;

                historyStorage.push({...pastCalculation});

                localStorage.setItem("historyStorage", JSON.stringify(historyStorage));

                userChoices.secondNumber = '';
                userChoices.operation = '';
                userChoices.firstNumber = display.value;
                break;
            }
            break;
            case '.':
                if (userChoices.firstNumber != '' && userChoices.firstNumber.includes(".") === false && userChoices.operation == ''){
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
            
