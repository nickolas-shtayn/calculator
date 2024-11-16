let userChoices = {
    firstNumber: '',
    operation: '',
    secondNumber: '',
}

const numPad = document.querySelector(".numbers")
numPad.addEventListener("click", (e) => {
    let target = e.target.textContent;
    if (userChoices.operation == ''){
        userChoices.firstNumber += target
    } else {
        userChoices.secondNumber += target
    }
    display.textContent = `${userChoices.firstNumber} ${userChoices.operation} ${userChoices.secondNumber}`;
})


const operations = document.querySelector(".operations")
operations.addEventListener("click", (e) => {
    let target = e.target.textContent;
    userChoices.operation = target;
    display.textContent = `${userChoices.firstNumber} ${userChoices.operation} ${userChoices.secondNumber}`;
})

const display = document.querySelector("#display");

const misc = document.querySelector("#misc")
misc.addEventListener("click", (e) => {
    let target = e.target.textContent;
    switch(target) {
        case '=':
            x = Number(userChoices.firstNumber);
            y = Number(userChoices.secondNumber)
            switch(userChoices.operation) {
                case '+':
                    display.textContent = x + y;
                    break;
                case '-':
                    display.textContent = x - y;
                    break;
                case '*':
                    display.textContent = x * y;
                    break;
                case '/':
                    display.textContent = x / y;
                    break;
            }
            userChoices.secondNumber = '';
            userChoices.operation = '';
            userChoices.firstNumber = Number(display.textContent);
            break;
        case 'A/C':
            userChoices.firstNumber = '';
            userChoices.secondNumber = '';
            userChoices.operation = '';
            display.textContent = '';
    }
})

  
  